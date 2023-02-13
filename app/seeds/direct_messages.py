from app.models import db, DirectMessage, environment, SCHEMA


def seed_direct_messages():
    demo_direct_message1 = DirectMessage(
        # From Demo to Marnie
        content='Hello Marnie', direct_channel_id=1, user_id=1 )
    demo_direct_message2 = DirectMessage(
        # From Marnie to Demo
        content='Hello Demo', direct_channel_id=1, user_id=2 )
    demo_direct_message3 = DirectMessage(
        # From Demo to Marnie
        content='This is a conversation', direct_channel_id=1, user_id=1 )
    demo_direct_message4 = DirectMessage(
        # From Demo to Bobbie
        content='Hello Bobbie', direct_channel_id=2, user_id=1 )
    demo_direct_message5 = DirectMessage(
        # From Demo to Bobbie
        content='Hello Demo', direct_channel_id=2, user_id=3 )
    db.session.add(demo_direct_message1)
    db.session.add(demo_direct_message2)
    db.session.add(demo_direct_message3)
    db.session.add(demo_direct_message4)
    db.session.add(demo_direct_message5)
    db.session.commit()


def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM direct_messages_table")

    db.session.commit()
