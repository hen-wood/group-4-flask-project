from app.models import db, Server, environment, SCHEMA, Icon


def seed_servers():
    demo_server1 = Server(
        name='Gamers Unite Server', code='a7h34', mod_id=1, category='Gaming' )


    demo_server2 = Server(
        name='The Entertainment Lounge', mod_id=1, category='Entertainment' )

    demo_server3 = Server(
        name='The Creative Corner', mod_id=1, category='Entertainment' )
    demo_server4 = Server(
        name='The Fitness Center', mod_id=1, category='Entertainment' )

    db.session.add(demo_server1)
    db.session.add(demo_server2)
    db.session.add(demo_server3)
    db.session.add(demo_server4)
    db.session.commit()

    demo1_icon = Icon(
        server_id = demo_server1.id,
        icon = 'https://cdn-icons-png.flaticon.com/512/2780/2780137.png'
    )
    demo2_icon = Icon(
        server_id = demo_server2.id,
        icon = 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?cs=srgb&dl=pexels-sebastian-ervi-1763075.jpg&fm=jpg'
    )
    demo3_icon = Icon(
        server_id = demo_server3.id,
        icon = 'https://www.success.com/wp-content/uploads/2016/07/waystotapintoyourcreativeself.jpg'
    )
    demo4_icon = Icon(
        server_id = demo_server4.id,
        icon = 'https://www.shutterstock.com/image-photo/gym-interior-free-space-your-260nw-1532086055.jpg'
    )

    db.session.add(demo1_icon)
    db.session.add(demo2_icon)
    db.session.add(demo3_icon)
    db.session.add(demo4_icon)
    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers_table")

    db.session.commit()
