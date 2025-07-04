from dataclasses import dataclass

from daos import AuthDAO, DecodeTokenStatusEnum


@dataclass
class VerifyAuthTokenService:
    _auth_dao: AuthDAO

    class InvalidTokenException(Exception):
        pass

    class ExpiredTokenException(Exception):
        pass

    @classmethod
    def build(cls) -> 'VerifyAuthTokenService':
        return cls(
            _auth_dao=AuthDAO(),
        )

    async def execute(self, token: str) -> bool:
        decoded_token_status_dto = await self._auth_dao.decode_token(token)

        if decoded_token_status_dto.status == DecodeTokenStatusEnum.VALID:
            return True
        else:
            return False
