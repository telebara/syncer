from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from starlette import status

from daos.auth_dao import AuthDAO, DecodeTokenStatusEnum
from daos.user_dao import UserDAO, UserEntity

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='api/auth/login')

async def get_current_user_from_token(
    token: str = Depends(oauth2_scheme),
    auth_dao: AuthDAO = Depends(AuthDAO.build),
    user_dao: UserDAO = Depends(UserDAO.build),
) -> UserEntity:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='No token provided',
        )

    decoded = await auth_dao.decode_token(token)
    if decoded.status != DecodeTokenStatusEnum.VALID or not decoded.user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired token',
        )

    user = await user_dao.get_user_by_id(decoded.user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found',
        )

    return user
