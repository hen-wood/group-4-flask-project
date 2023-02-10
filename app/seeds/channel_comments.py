from app.models import db, ChannelComment, environment, SCHEMA


def seed_channel_comments():
    demo_channel_comment1 = ChannelComment(
        content='comment 1', channel_id=2, user_id=1 )
    demo_channel_comment2 = ChannelComment(
        content='comment 2', channel_id=2, user_id=1 )
    db.session.add(demo_channel_comment1)
    db.session.add(demo_channel_comment2)
    db.session.commit()


def undo_channel_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_comments_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel_comments_table")

    db.session.commit()
