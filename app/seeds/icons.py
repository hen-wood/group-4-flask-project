from app.models import db, Icon, environment, SCHEMA


def seed_icons():
    demo_icon = Icon(
        icon='https://images.unsplash.com/photo-1679578388224-3f637e29baab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', server_id=1 )

    db.session.add(demo_icon)
    db.session.commit()


def undo_icons():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.icons_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM icons_table")

    db.session.commit()
