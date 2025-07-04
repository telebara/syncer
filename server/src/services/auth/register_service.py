import re
from dataclasses import dataclass

from fastapi import Depends
from pydantic import EmailStr, SecretStr
from sqlalchemy.ext.asyncio import AsyncSession

from daos import AuthDAO, UserDAO, AuthTokensDTO
from common.database import get_async_session


@dataclass
class RegisterService:
    _auth_dao: AuthDAO
    _user_dao: UserDAO

    class EmailAlreadyExistsException(Exception):
        pass

    class PasswordTooShortException(Exception):
        pass

    class UsernameInvalidException(Exception):
        pass

    @classmethod
    def build(
        cls,
        session: AsyncSession = Depends(get_async_session),
    ) -> 'RegisterService':
        return cls(
            _auth_dao=AuthDAO(),
            _user_dao=UserDAO(
                _session=session,
            ),
        )

    async def execute(
        self,
        email: EmailStr,
        username: str,
        password: SecretStr,
        image: str | None = None,
    ) -> AuthTokensDTO:
        if await self._user_dao.is_user_exists_by_email(email):
            raise self.EmailAlreadyExistsException

        if len(password.get_secret_value()) < 8:
            raise self.PasswordTooShortException

        if not (3 < len(username) <= 100):
            raise self.UsernameInvalidException
        if not re.match(r'^[A-Za-z0-9_]+$', username):
            raise self.UsernameInvalidException

        hashed_password = await self._auth_dao.generate_hashed_password(password.get_secret_value())
        user = await self._user_dao.create_user(
            email=email,
            username=username,
            password=hashed_password,
            image=image,
        )
        return await self._auth_dao.generate_tokens(user.id)
