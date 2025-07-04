from dataclasses import dataclass

from daos import AuthDAO, AuthTokensDTO, DecodeTokenStatusEnum


@dataclass
class RefreshTokenService:
    _auth_dao: AuthDAO

    class InvalidTokenException(Exception):
        pass

    class ExpiredTokenException(Exception):
        pass

    @classmethod
    def build(cls) -> 'RefreshTokenService':
        return cls(
            _auth_dao=AuthDAO(),
        )

    async def execute(self, refresh_token: str) -> AuthTokensDTO:
        decoded_token_status_dto = await self._auth_dao.decode_token(refresh_token)
        if decoded_token_status_dto.status == DecodeTokenStatusEnum.INVALID:
            raise self.InvalidTokenException
        if decoded_token_status_dto.status == DecodeTokenStatusEnum.EXPIRED:
            raise self.ExpiredTokenException
        if not decoded_token_status_dto.user_id:
            raise self.InvalidTokenException

        return await self._auth_dao.generate_tokens(decoded_token_status_dto.user_id)

