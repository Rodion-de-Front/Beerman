"""fix type of name in products

Revision ID: 738090b577b3
Revises: ab22936a180b
Create Date: 2023-12-05 18:07:32.756168

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '738090b577b3'
down_revision: Union[str, None] = 'ab22936a180b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'name',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.TEXT(),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'name',
               existing_type=sa.TEXT(),
               type_=sa.VARCHAR(length=50),
               existing_nullable=False)
    # ### end Alembic commands ###
