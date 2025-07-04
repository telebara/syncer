from fastapi import APIRouter, Depends, HTTPException

from common.get_current_user_from_token import get_current_user_from_token
from services.user import UpdateUserService
from dtos.user import UserMeResponseDTO, UserUpdateRequestDTO
from daos.user_dao import UserEntity

router = APIRouter(prefix='/user', tags=['user'])


@router.patch('/me', response_model=UserMeResponseDTO)
async def update_me(
    data: UserUpdateRequestDTO,
    current_user: UserEntity = Depends(get_current_user_from_token),
    service: UpdateUserService = Depends(UpdateUserService.build),
) -> UserMeResponseDTO:
    if not data.username and not data.image:
        raise HTTPException(
            status_code=400,
            detail={
                'code': 'nothing_to_update',
                'message': 'Nothing to update',
            },
        )

    updated: UserEntity | None = await service.execute(
        user_id=current_user.id,
        username=data.username,
        image=data.image,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail={
                'code': 'user_not_found',
                'message': 'User not found',
            },
        )

    return UserMeResponseDTO(
        id=updated.id,
        email=updated.email,
        image=updated.image,
        username=updated.username,
        created_at=updated.created_at,
    )


@router.get('/me', response_model=UserMeResponseDTO)
async def me(current_user: UserEntity = Depends(get_current_user_from_token)):
    return UserMeResponseDTO(
        id=current_user.id,
        email=current_user.email,
        image=current_user.image,
        username=current_user.username,
        created_at=current_user.created_at,
    )
