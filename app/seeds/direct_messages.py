from app.models import db, DirectMessage, environment, SCHEMA


def seed_direct_messages():
    demo_direct_message1 = DirectMessage(
        content='direct message 1', direct_channel_id=1, user_id=1 )
    demo_direct_message2 = DirectMessage(
        content='direct message 2', direct_channel_id=2, user_id=3 )
    db.session.add(demo_direct_message1)
    db.session.add(demo_direct_message2)
    db.session.commit()


def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM direct_messages_table")

    db.session.commit()