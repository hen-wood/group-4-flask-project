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
    demo_membership3 = Membership(
        server_id = 1,
        user_id = 2
    )
    demo_membership4 = Membership(
        server_id = 1,
        user_id = 3
    )
    demo_membership5 = Membership(
        server_id = 1,
        user_id = 4
    )
    demo_membership6 = Membership(
        server_id = 1,
        user_id = 5
    )
    demo_membership7 = Membership(
        server_id = 1,
        user_id = 6
    )
    demo_membership8 = Membership(
        server_id = 3,
        user_id = 1
    )
    demo_membership9 = Membership(
        server_id = 4,
        user_id = 1
    )

    db.session.add(demo_membership1)
    db.session.add(demo_membership2)
    db.session.add(demo_membership3)
    db.session.add(demo_membership4)
    db.session.add(demo_membership5)
    db.session.add(demo_membership6)
    db.session.add(demo_membership7)
    db.session.add(demo_membership8)
    db.session.add(demo_membership9)
    db.session.commit()


def undo_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM memberships_table")

    db.session.commit()
