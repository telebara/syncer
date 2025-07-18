"""user tag

Revision ID: 5859607f4d10
Revises: 666273e229db
Create Date: 2025-07-04 18:33:07.954310

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5859607f4d10'
down_revision: Union[str, None] = '666273e229db'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('usertag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('color', sa.String(length=7), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['app_user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'name', name='uq_user_tag')
    )
    op.create_index(op.f('ix_usertag_id'), 'usertag', ['id'], unique=False)
    op.alter_column('card', 'rating',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('card', 'rating',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=True)
    op.drop_index(op.f('ix_usertag_id'), table_name='usertag')
    op.drop_table('usertag')
    # ### end Alembic commands ###
