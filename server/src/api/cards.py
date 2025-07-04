from fastapi import APIRouter, Depends, HTTPException, status

from common.get_current_user_from_token import get_current_user_from_token
from services.cards import (
    CreateCardService,
    GetUserCardsService,
    GetCardService,
    UpdateCardService,
    DeleteCardService,
)
from daos.user_dao import UserEntity
from dtos.cards import (
    CreateCardRequestDTO,
    UpdateCardRequestDTO,
    CardResponseDTO,
    CardsListResponseDTO,
    TagDTO,
)

router = APIRouter(prefix='/cards', tags=['cards'])


@router.post(
    '/',
    response_model=CardResponseDTO,
    status_code=status.HTTP_201_CREATED,
)
async def create_card(
    data: CreateCardRequestDTO,
    user: UserEntity = Depends(get_current_user_from_token),
    service: CreateCardService = Depends(CreateCardService.build),
) -> CardResponseDTO:
    try:
        card_dto = await service.execute(
            name=data.name,
            description=data.description,
            image_url=data.image_url,
            rating=data.rating,
            user_id=user.id,
            tag_ids=data.tag_ids,
        )
    except CreateCardService.CardNameInvalidException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'card_name_invalid',
                'message': 'Card name cannot be empty',
            },
        )
    except CreateCardService.CardNameTooLongException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'card_name_too_long',
                'message': 'Card name cannot exceed 255 characters',
            },
        )
    except CreateCardService.RatingInvalidException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'rating_invalid',
                'message': 'Rating must be between 0.0 and 10.0',
            },
        )

    return CardResponseDTO(
        id=card_dto.id,
        name=card_dto.name,
        description=card_dto.description,
        image_url=card_dto.image_url,
        rating=card_dto.rating,
        created_at=card_dto.created_at,
        tags=[TagDTO(**tag) for tag in card_dto.tags],
    )


@router.get(
    '/',
    response_model=CardsListResponseDTO,
    status_code=status.HTTP_200_OK,
)
async def get_user_cards(
    user: UserEntity = Depends(get_current_user_from_token),
    service: GetUserCardsService = Depends(GetUserCardsService.build),
) -> CardsListResponseDTO:
    cards = await service.execute(user.id)

    return CardsListResponseDTO(
        cards=[
            CardResponseDTO(
                id=card.id,
                name=card.name,
                description=card.description,
                image_url=card.image_url,
                rating=card.rating,
                created_at=card.created_at,
                tags=[TagDTO(**tag) for tag in card.tags],
            )
            for card in cards
        ]
    )


@router.get(
    '/{card_id}',
    response_model=CardResponseDTO,
    status_code=status.HTTP_200_OK,
)
async def get_card(
    card_id: int,
    user: UserEntity = Depends(get_current_user_from_token),
    service: GetCardService = Depends(GetCardService.build),
) -> CardResponseDTO:
    try:
        card_dto = await service.execute(card_id, user.id)
    except GetCardService.CardNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'code': 'card_not_found',
                'message': 'Card not found',
            },
        )

    return CardResponseDTO(
        id=card_dto.id,
        name=card_dto.name,
        description=card_dto.description,
        image_url=card_dto.image_url,
        rating=card_dto.rating,
        created_at=card_dto.created_at,
        tags=[TagDTO(**tag) for tag in card_dto.tags],
    )


@router.put(
    '/{card_id}',
    response_model=CardResponseDTO,
    status_code=status.HTTP_200_OK,
)
async def update_card(
    card_id: int,
    data: UpdateCardRequestDTO,
    user: UserEntity = Depends(get_current_user_from_token),
    service: UpdateCardService = Depends(UpdateCardService.build),
) -> CardResponseDTO:
    try:
        card_dto = await service.execute(
            card_id=card_id,
            user_id=user.id,
            name=data.name,
            description=data.description,
            image_url=data.image_url,
            rating=data.rating,
            tag_ids=data.tag_ids,
        )
    except UpdateCardService.CardNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'code': 'card_not_found',
                'message': 'Card not found',
            },
        )
    except UpdateCardService.CardNameInvalidException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'card_name_invalid',
                'message': 'Card name cannot be empty',
            },
        )
    except UpdateCardService.CardNameTooLongException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'card_name_too_long',
                'message': 'Card name cannot exceed 255 characters',
            },
        )
    except UpdateCardService.RatingInvalidException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'rating_invalid',
                'message': 'Rating must be between 0.0 and 10.0',
            },
        )

    return CardResponseDTO(
        id=card_dto.id,
        name=card_dto.name,
        description=card_dto.description,
        image_url=card_dto.image_url,
        rating=card_dto.rating,
        created_at=card_dto.created_at,
        tags=[TagDTO(**tag) for tag in card_dto.tags],
    )


@router.delete(
    '/{card_id}',
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_card(
    card_id: int,
    user: UserEntity = Depends(get_current_user_from_token),
    service: DeleteCardService = Depends(DeleteCardService.build),
) -> None:
    try:
        await service.execute(card_id, user.id)
    except DeleteCardService.CardNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'code': 'card_not_found',
                'message': 'Card not found',
            },
        )
