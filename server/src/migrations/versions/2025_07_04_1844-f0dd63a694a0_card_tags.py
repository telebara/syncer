"""card tags

Revision ID: f0dd63a694a0
Revises: 5859607f4d10
Create Date: 2025-07-04 18:44:49.559723

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f0dd63a694a0'
down_revision: Union[str, None] = '5859607f4d10'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cardtag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['card.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['usertag.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('card_id', 'tag_id', name='uq_card_tag')
    )
    op.create_index(op.f('ix_cardtag_id'), 'cardtag', ['id'], unique=False)
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
    op.drop_index(op.f('ix_cardtag_id'), table_name='cardtag')
    op.drop_table('cardtag')
    # ### end Alembic commands ###
