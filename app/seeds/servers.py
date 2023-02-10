from app.models import db, Server, environment, SCHEMA


def seed_servers():
    demo_server1 = Server(
        name='Demo Server', code='a7h34', mod_id=1 )

    db.session.add(demo_server1)
    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers_table")

    db.session.commit()
