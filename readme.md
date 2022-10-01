## Notes

- What to show a guest on the landing page?
- Add redis for caching data

---

## Actors

    - guest: 0
    - reader: 1
    - reader+: 1.1
    - moderators: 1.5
    - debaters: 2
    - publisher: 2
    - admin: 5

## Permissions

    - Register - 0
    - Login - 1
    - Reset Password - 1
    - Like an article - 1
    - Affirm an article - 1.1
    - Follow someone (needs to be a publisher only) - 1
    - Comment on an article - 1
    - Create an article - 2
    - Update an article - 2
    - Delete an article - 2

## Story:

### Guest

    - Goes to Apologea.com
    - They see the excerpts of the free apologies as long as they are not logged in.
    - They decide to register for a free account and become a reader.

### Reader

    - They log in.
    - They follow their favorite publishers then navigate to the homepage.
    - They see a feed of the new free apologies from the publishers they follow.
    - They can 'like', 'affirm', or 'comment' on each apology.
    - Their favorite publishers publish premium apologies that they cannot read except for the excerpt, so they decide to upgrade to reader+

### Reader+

    - Once upgraded, they can choose which publisher to subscribe to.
    - After confirmation, they can read premium apologies of chosen publishers.

### Publisher

    - A publisher can register for a publisher role and starts writing free and premium apologies.
    - They can write one apology a week.
    - They can set their rates for premium apologies.
    - They receive payments from readers+ who subscribe to their premium apologies.
    - They can like, affirm, and comment on other apologies.
