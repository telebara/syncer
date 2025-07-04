from dataclasses import dataclass

from fastapi import Depends
from pydantic import EmailStr, SecretStr
from sqlalchemy.ext.asyncio import AsyncSession

from common.database import get_async_session
from daos import AuthDAO, UserDAO, AuthTokensDTO


@dataclass
class LoginService:
    _auth_dao: AuthDAO
    _user_dao: UserDAO

    class UserNotFoundException(Exception):
        pass

    class InvalidPasswordException(Exception):
        pass

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'LoginService':
        return LoginService(
            _auth_dao=AuthDAO(),
            _user_dao=UserDAO(
                _session=session,
            ),
        )

    async def execute(
        self,
        email: EmailStr,
        password: SecretStr,
    ) -> AuthTokensDTO:
        user, hashed_password = await self._user_dao.get_user_by_email(email, with_hashed_password=True)

        if not user:
            raise self.UserNotFoundException

        if not await self._auth_dao.verify_password(
            plain_password=password.get_secret_value(),
            hashed_password=hashed_password,
        ):
            raise self.InvalidPasswordException

        return await self._auth_dao.generate_tokens(user.id)
