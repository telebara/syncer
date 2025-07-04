from fastapi import APIRouter, Depends, HTTPException, status

from services.auth import (
    LoginService,
    RegisterService,
    VerifyAuthTokenService,
    RefreshTokenService,
)
from dtos.auth import (
    LoginRequestDTO,
    LoginResponseDTO,
    RegisterRequestDTO,
    VerifyTokenRequestDTO,
    RefreshTokenRequestDTO,
)

router = APIRouter(prefix='/auth', tags=['auth'])


@router.post(
    '/login',
    response_model=LoginResponseDTO,
    status_code=status.HTTP_200_OK,
)
async def login(
    data: LoginRequestDTO,
    service: LoginService = Depends(LoginService.build),
) -> LoginResponseDTO:
    try:
        tokens = await service.execute(email=data.email, password=data.password)
    except service.UserNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'code': 'user_not_found',
                'message': 'User does not exist',
            },
        )
    except service.InvalidPasswordException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'code': 'invalid_password',
                'message': 'Incorrect credentials',
            },
        )

    return LoginResponseDTO(
        access_token=tokens.access_token,
        refresh_token=tokens.refresh_token,
    )


@router.post(
    '/register',
    response_model=LoginResponseDTO,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    data: RegisterRequestDTO,
    service: RegisterService = Depends(RegisterService.build),
) -> LoginResponseDTO:
    try:
        tokens = await service.execute(
            email=data.email,
            username=data.username,
            password=data.password,
            image=data.image,
        )
    except service.EmailAlreadyExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                'code': 'email_exists',
                'message': 'Email already registered',
            },
        )
    except service.PasswordTooShortException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'password_too_short',
                'message': 'Password must be at least 8 characters',
            },
        )
    except service.UsernameInvalidException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'username_invalid',
                'message': 'Username must be 4-100 characters and contain only letters, numbers, or underscores',
            },
        )
    return LoginResponseDTO(
        access_token=tokens.access_token,
        refresh_token=tokens.refresh_token,
    )


@router.post(
    '/verify',
    status_code=status.HTTP_204_NO_CONTENT,
)
async def verify_token(
    data: VerifyTokenRequestDTO,
    service: VerifyAuthTokenService = Depends(VerifyAuthTokenService.build),
) -> None:
    if not await service.execute(data.access_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token',
        )


@router.post(
    '/refresh',
    response_model=LoginResponseDTO,
    status_code=status.HTTP_200_OK,
)
async def refresh_token(
    data: RefreshTokenRequestDTO,
    service: RefreshTokenService = Depends(RefreshTokenService.build),
) -> LoginResponseDTO:
    try:
        tokens = await service.execute(data.refresh_token)
    except service.InvalidTokenException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'code': 'invalid_refresh_token',
                'message': 'Invalid refresh token',
            },
        )
    except service.ExpiredTokenException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'code': 'refresh_token_expired',
                'message': 'Refresh token expired',
            },
        )

    return LoginResponseDTO(
        access_token=tokens.access_token,
        refresh_token=tokens.refresh_token,
    )
