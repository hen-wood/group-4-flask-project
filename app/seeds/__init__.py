from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .channel_comments import seed_channel_comments, undo_channel_comments
from .direct_channels import seed_direct_channels, undo_direct_channels
from .direct_messages import seed_direct_messages, undo_direct_messages
from .memberships import seed_memberships, undo_memberships

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_direct_messages()
        undo_direct_channels()
        undo_channel_comments()
        undo_channels()
        undo_memberships()
        undo_servers()
        undo_users()
    seed_users()
    seed_servers()
    seed_memberships()
    seed_channels()
    seed_channel_comments()
    seed_direct_channels()
    seed_direct_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_direct_messages()
    undo_direct_channels()
    undo_channel_comments()
    undo_channels()
    undo_memberships()
    undo_servers()
    undo_users()
    # Add other undo functions here
