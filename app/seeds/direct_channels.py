from app.models import db, DirectChannel, environment, SCHEMA


def seed_direct_channels():
    demo_direct1 = DirectChannel(
        user_one_id = 1,
        user_two_id = 2
    )

    demo_direct2 = DirectChannel(
        user_one_id = 2,
        user_two_id = 3
    )

    db.session.add(demo_direct1)
    db.session.add(demo_direct2)
    db.session.commit()


def undo_direct_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_channels_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM direct_channels_table")

    db.session.commit()
