# Changelog

## 2023-01-02 20:00

[Frontend] [1.6.1]

#### Changed

- adjusted card color on light theme
- added `response.ok` error checks on all site api calls

## 2023-01-02 14:00

[Frontend] [1.6.0]

#### Added

- lots of work with css animations; header-logo is now animated
- added a WIP spinner to async loads

## 2023-01-01 14:22

[Backend] [1.5.21]

#### Added

- put a timestamp on cache update log

[Frontend] [1.5.5]

#### Added

- worked a little on shaping the size of the site

#### Fixed

- creator admin panel works correctly again | admin panel is highly WIP

## 2022-12-31 20:50

[Backend] [1.5.2]

#### Fixed

- put back `unsafe_` render option for comrak to external fix anchor tags in markdown

[Frontend] [1.5.4]

#### Changed

- testing out modular .scss files for different style components
- changing themeing to green for beginnings of circuit board theme

## 2022-12-31 14:11

[Frontend] [1.5.3]

#### Added

- most test style work for the admin panel

#### Changed

- updated the editor and creator to use a date input type
- upadted the admin api post creator and updater functions to convert the date object to a PST time string

## 2022-12-28 22:00

[Frontend] [1.5.2]

#### Added

- started some test styling on the admin component
- redesign of admin panel form handling coming soon; will move conditional logic to a solid-js store verse a signal

## 2022-12-28 16:57

[Backend] [1.5.1]

#### Added

- admin create post route
- admin delete post route

[Frontend] [1.5.1]

#### Added

- admin create post component
- admin delete post input
- admin routes are still very much WIP, basic functionality was just placed to get going; routes work but needs massive rewrites and QOL updates

## 2022-12-28

[Backend] [1.5.0]

#### Added

- admin api routing
- admin auth middleware work
- postgres queries on the Post model

[Frontend] [1.5.0]

#### Added

- admin login updates
- admin panel updates
- started work on admin post editor

## 2022-12-23

[Backend] [1.3.0]

#### Added

- Started work on `/admin` path; currently labeled under `api/admin` for dev proxy reasons, but want to adjust this
- Admin auth middleware

## 2022-12-18

[Backend] [1.2.0]

#### Added

- Syntect for backend serevr side syntax highlighting
- OnceCell to preload the SyntectAdapter and themes
- Local utilities package added including starting jwt work
- Started bringing in some `/admin` handlers

## 2022-12-12

- Init commit
