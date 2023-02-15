from app.models import db, Channel, environment, SCHEMA


def seed_channels():
    demo_channel1 = Channel(
        name='Demo Channel 1', description='this is a test description', server_id=1 )
    demo_channel2 = Channel(
        name='Demo Channel 2', server_id=1 )
    db.session.add(demo_channel1)
    db.session.add(demo_channel2)
    db.session.commit()


def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels_table")

    db.session.commit()
