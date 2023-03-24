from app.models import db, Banner, environment, SCHEMA


def seed_banners():
    demo_banner = Banner(
        banner='https://images.unsplash.com/photo-1679351511910-94bc52d96c88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80', server_id=1 )

    db.session.add(demo_banner)
    db.session.commit()


def undo_banners():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.banners_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM banners_table")

    db.session.commit()
