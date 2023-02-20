## Declaration of use of previous work
- The only previous work usage was utilizing a previous scaffold I had made, a basic `Next.js` template with Tailwind CSS setup. Almost every component was made during the duration of the hackathon, as well as integrations with sponsors. The web3 and contract part was made purely during the duration of the hackathon!

## Sponsors integrated
- **Push Protocol** : To send push notifications when candidates or voters have their statuses upgraded or removed by admins. For such cases, we send direct unicast messages and for other events like election culmination and results declaration, we use the broadcast channel.
- **Arcana** : Social sign in, which is must for an app like ours that will be used by both wallet-web3-savvy and not-so-tech-savvy people across the nation. The idea is to ease the adoption of wallets and not overwhelm new users that have no idea about the same. Arcana is just perfect for that.
- **Polygon** : An event like general elections where a large number of concurrent users will be participating, scalability, high throughput and low gas fees is very important. Hence, we have chosen Polygon as our main chain for the `Open track`.
- **FVM** (Filecoin) : We think our product can benefit from having auto storage renewal deals since we will have to store voter documents on Filecoin. Having auto-renewals integrated with the contract with the contract (needs to be implemented, future work) would be perfect.
- **The graph** : We have a subgraph that has that query listening to events emitted by the candidate contract. It gets only the `address` and the latest `status` emitted in the event (fired when status of candidate changes through upgrading by admin)


## Steps to setup

- Clone the repo : `git clone https://github.com/VaithiSniper/pehchan.git`
- `cd` into the directory, and install packages with `npm i`
- Copy this file into your `public` folder : [glb files](https://drive.google.com/drive/folders/1nAkVwnHdj8YxGgsEiHLi9Ee7TtipRKHi?usp=share_link)

## Server

- Start the development server using : `npm run dev`

## Things to note

- We will be using the `develop` and `main` branches. The `main` branch will contain the latest stable code and the `develop` will be used for development/staging.
- **ALWAYS** start from the `develop` branch. For every new feature, make a new branch and checkout to it with `git checkout -b <branch-name>`. Make sure the branch name is verbose and indicates the feature being implemented.
- Once development is done and tested in your branch, push the branch to the remote with `git push origin <branch-name>`.
- After pushing the branch, open a PR to `develop` and tag @VaithiSniper to review.
- Follow-up and fix PR-comments if any.
- Once satisfactory, PR will be merged to `develop`.
- After a set of features are implemented and given `develop` is stable, it will be merged to `main` and must be subsequently **tested**.
