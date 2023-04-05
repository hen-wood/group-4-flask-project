"""empty message

Revision ID: cca819066d3f
Revises:
Create Date: 2023-03-23 18:04:10.117044

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils
from app.models import Server
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'cca819066d3f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('direct_channels_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_one_id', sa.Integer(), nullable=False),
    sa.Column('user_two_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_one_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_two_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE direct_channels_table SET SCHEMA {SCHEMA};")

    op.create_table('servers_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('mod_id', sa.Integer(), nullable=False),
    sa.Column('code', sa.String(), nullable=True),
       sa.Column('category', sqlalchemy_utils.types.choice.ChoiceType(Server.category_choices), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['mod_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('code')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE servers_table SET SCHEMA {SCHEMA};")

    op.create_table('banners_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('banner', sa.String(length=100), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['server_id'], ['servers_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE banners_table SET SCHEMA {SCHEMA};")

    op.create_table('channels_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(length=100), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['server_id'], ['servers_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE channels_table SET SCHEMA {SCHEMA};")

    op.create_table('direct_messages_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('direct_channel_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('edited', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['direct_channel_id'], ['direct_channels_table.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE direct_messages_table SET SCHEMA {SCHEMA};")

    op.create_table('icons_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('icon', sa.String(length=255), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['server_id'], ['servers_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE icons_table SET SCHEMA {SCHEMA};")

    op.create_table('memberships_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['server_id'], ['servers_table.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE memberships_table SET SCHEMA {SCHEMA};")

    op.create_table('channel_comments_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('channel_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('edited', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['channel_id'], ['channels_table.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE channel_comments_table SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('channel_comments_table')
    op.drop_table('memberships_table')
    op.drop_table('icons_table')
    op.drop_table('direct_messages_table')
    op.drop_table('channels_table')
    op.drop_table('banners_table')
    op.drop_table('servers_table')
    op.drop_table('direct_channels_table')
    op.drop_table('users')
    # ### end Alembic commands ###
