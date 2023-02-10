## Steps to setup
- Clone the repo : `git clone https://github.com/VaithiSniper/pehchan.git`
- `cd` into the directory, and install packages with `npm i`

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
