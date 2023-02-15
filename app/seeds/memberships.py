from app.models import db ,Membership, environment, SCHEMA


def seed_memberships():
    demo_membership1 = Membership(
        server_id = 1,
        user_id = 1
    )
    demo_membership2 = Membership(
        server_id = 2,
        user_id = 1
    )


    db.session.add(demo_membership1)
    db.session.add(demo_membership2)
    db.session.commit()


def undo_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM memberships_table")

    db.session.commit()
