from app.models import db, ChannelComment, environment, SCHEMA


def seed_channel_comments():


    demo_channel_comment1 = ChannelComment(
        content='Hey, have you played the latest Assassin\'s Creed game?', channel_id=1, user_id=1)
    db.session.add(demo_channel_comment1)

    demo_channel_comment2 = ChannelComment(
        content='No, I haven\'t. How is it?', channel_id=1, user_id=2)
    db.session.add(demo_channel_comment2)

    demo_channel_comment3 = ChannelComment(
        content='It\'s great! The graphics are amazing and the storyline is really engaging.',
        channel_id=1, user_id=1)
    db.session.add(demo_channel_comment3)

    demo_channel_comment4 = ChannelComment(
        content='I\'ll have to check it out. Have you played any other good games lately?',
        channel_id=1, user_id=2)
    db.session.add(demo_channel_comment4)

    demo_channel_comment5 = ChannelComment(
        content='Yeah, I just finished playing Control. It\'s a really unique game with cool supernatural elements.',
        channel_id=1, user_id=1)
    db.session.add(demo_channel_comment5)

    demo_channel_comment6 = ChannelComment(
        content='I haven\'t heard of that one. What platform is it on?',
        channel_id=1, user_id=2)
    db.session.add(demo_channel_comment6)

    demo_channel_comment7 = ChannelComment(
        content='It\'s on PlayStation 4 and Xbox One. I highly recommend it!',
        channel_id=1, user_id=1)
    db.session.add(demo_channel_comment7)

    demo_channel_comment8 = ChannelComment(
        content='Thanks for the recommendation! I\'ll have to give it a try.',
        channel_id=1, user_id=2)
    db.session.add(demo_channel_comment8)

    demo_channel_comment9 = ChannelComment(
        content='Have you played any good indie games lately?',
        channel_id=1, user_id=2)
    db.session.add(demo_channel_comment9)

    demo_channel_comment10 = ChannelComment(
        content='Yes, I recently played Hades and it was fantastic. The gameplay is really fun and the story is compelling.',
        channel_id=1, user_id=1)
    db.session.add(demo_channel_comment10)

    demo_channel_comment11 = ChannelComment(
        content='I\'ve heard a lot of great things about that game. What platform is it on?',
        channel_id=1, user_id=2)
    db.session.add(demo_channel_comment11)

    demo_channel_comment12 = ChannelComment(
        content='It\'s on Nintendo Switch, PlayStation 4, PlayStation 5, Xbox One, and Xbox Series X/S.',
        channel_id=1, user_id=1)
    db.session.add(demo_channel_comment12)

    demo_channel_comment13 = ChannelComment(
        content='I just got a new gaming PC. Do you have any recommendations for PC games?',
        channel_id=1, user_id=2)
    db.session.add(demo_channel_comment13)

    demo_channel_comment14 = ChannelComment(
        content='Definitely check out Disco Elysium. It\'s a really unique RPG with great writing and a lot of player choice.',
        channel_id=1, user_id=1)
    db.session.add(demo_channel_comment14)

    demo_channel_comment15 = ChannelComment(
        content='That sounds really interesting. I\'ll add it to my list!',
        channel_id=1, user_id=2)
    db.session.add(demo_channel_comment15)


    db.session.commit()


def undo_channel_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_comments_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel_comments_table")

    db.session.commit()
