from app.models import db, Server, environment, SCHEMA, Icon


def seed_servers():
    demo_server1 = Server(
        name='Demo Server', code='a7h34', mod_id=1, category='Gaming' )


    demo_server2 = Server(
        name='Demo Server2', mod_id=1, category='Entertainment' )

    db.session.add(demo_server1)
    db.session.add(demo_server2)
    db.session.commit()

    demo1_icon = Icon(
        server_id = demo_server1.id,
        icon = 'https://i.imgur.com/Gyu4tzS_d.jpg?maxwidth=520&shape=thumb&fidelity=high'
    )
    demo2_icon = Icon(
        server_id = demo_server2.id,
        icon = 'https://i.imgur.com/Gyu4tzS_d.jpg?maxwidth=520&shape=thumb&fidelity=high'
    )

    db.session.add(demo1_icon)
    db.session.add(demo2_icon)
    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers_table")

    db.session.commit()
