<p align="center"><img src="docs/icon.png" width="112" alt="Write. app icon"></p>

<h1 align="center">Write.</h1>

<p align="center"><b>A dark, distraction-free document editor for your Mac that works like Google Docs — even offline.</b><br>
Free to use. Powered by Formula0ne.</p>

<p align="center"><a href="https://github.com/subhodeep2002/Write/releases/latest"><b>⬇ Download Write. for Mac</b></a></p>

![Write. editing a document with tabs](docs/screenshots/editor.png)

---

## Contents

1. [What is Write.?](#what-is-write)
2. [What you need](#what-you-need)
3. [Download and install](#download-and-install)
4. [Opening it for the first time](#opening-it-for-the-first-time)
5. [Your first document](#your-first-document)
6. [What it can do](#what-it-can-do)
7. [Google Docs sync (optional)](#google-docs-sync-optional)
8. [Where are my files?](#where-are-my-files)
9. [Updating and uninstalling](#updating-and-uninstalling)
10. [Problems and fixes](#problems-and-fixes)
11. [Licence and copyright](#licence-and-copyright)

---

## What is Write.?

Write. is a writing app for macOS. It looks and works like Google Docs, with the same menus, toolbar, pages and document tabs, in a pure black design.

- **Works without internet.** Everything is saved on your Mac automatically, as you type.
- **Feels like Google Docs.** It has headings, fonts, colours, lists, tables, images, comments, page setup, find & replace and version history.
- **Document tabs**, like Google Docs. You can have one tab per chapter, with subtabs and emoji icons.
- **Spelling and grammar checking** that works on your Mac, with no internet needed.
- **Optional Google Docs sync.** Bring your Google Docs in, and send your changes back.

---

## What you need

- A Mac with **Apple Silicon**: M1, M2, M3, M4 or newer. (Not sure? Click  → **About This Mac** and look for "Chip".)
- **macOS 12 (Monterey) or newer.**
- About **400 MB** of free space.

Macs with an Intel processor aren't supported yet.

---

## Download and install

**Step 1 — Download.**
Go to the **[Releases page](https://github.com/subhodeep2002/Write/releases/latest)**. Under **Assets**, click the file named **`Write-1.0.0-arm64.dmg`**. It's about 140 MB and goes into your **Downloads** folder.

**Step 2 — Open the file.**
Double-click **`Write-1.0.0-arm64.dmg`** in Downloads. A window like this appears:

![The Write. installer window](docs/screenshots/installer.png)

**Step 3 — Drag Write. into Applications.**
Drag the **Write.** icon on the left onto the **Applications** folder on the right. Wait a few seconds while it copies.

**Step 4 — Eject the installer.**
In a Finder window, look at the left sidebar. Click the **⏏** button next to **Write**. You can now delete the `.dmg` file from Downloads.

**Step 5 — Open Write.**
Open your **Applications** folder and double-click **Write**. Or press **⌘ Space**, type **Write**, and press **Return**.

> 💡 To keep it in your Dock, open Write., then right-click its Dock icon and choose **Options → Keep in Dock**.

---

## Opening it for the first time

Write. is a free app, and it isn't registered with Apple's paid developer programme. So the **first time** you open it, macOS asks you to confirm that you trust it. You only do this once.

1. Open Write. macOS shows a message saying it can't check the app for malware. Click **Done**. Don't click "Move to Trash".
2. Open **System Settings** ( → **System Settings…**) and click **Privacy & Security** in the sidebar.
3. Scroll down to the **Security** section. You'll see *"Write." was blocked to protect your Mac*. Click **Open Anyway**.
4. Type your Mac password (or use Touch ID), then click **Open Anyway** once more.

That's it. From now on, Write. opens normally.

<details>
<summary>For advanced users: a Terminal shortcut that does the same thing</summary>

```bash
xattr -dr com.apple.quarantine /Applications/Write.app
```

</details>

---

## Your first document

When Write. opens, you see your documents.

![The home screen](docs/screenshots/home.png)

- Click **Blank document** (or press **⌘ N**) to start writing.
- Click **Open a file** to open a Word (`.docx`), Markdown (`.md`), web page (`.html`) or text (`.txt`) file. You can also drag the file onto the window.
- **There's no Save button.** Every change is saved automatically. The top of the window says **"Saved to this Mac"**.
- Click the **W.** in the top-left corner to go back to all your documents.

---

## What it can do

### Document tabs

Split a long document into tabs, like Google Docs. You can use one tab per chapter, add subtabs, and give tabs emoji icons. The headings of the tab you're in are listed under it. Click **+** to add a tab. Click a tab's **⋮** button to rename, duplicate, move or delete it. You can also drag tabs to reorder them.

![Document tabs and the tab menu](docs/screenshots/document-tabs.png)

### Spelling and grammar

Mistakes are underlined while you write: **red** for spelling, **blue** for grammar. Click an underlined word to see suggestions, then click one to fix it. **Add to dictionary** remembers names and words you made up. Press **⌥ ⌘ X** to jump to the next mistake. The checking happens on your Mac; nothing is sent anywhere.

![A spelling suggestion](docs/screenshots/spelling-and-grammar.png)

### Right-click menu

Right-click any text for quick formatting, colours, alignment, links, comments, change case and more. Inside a table you can add or remove rows and columns, or **sort the table A → Z**.

![The right-click menu](docs/screenshots/right-click-menu.png)

### Download as Word, PDF and more

Go to **File → Download** to save as Word (`.docx`), PDF, web page, Markdown or plain text. If your document has tabs, Write. asks whether you want the **current tab** or **all tabs** in one file.

![Choosing the current tab or all tabs](docs/screenshots/download-tabs.png)

### Version history

Write. keeps earlier versions of your document automatically. Open **File → Version history** to look at an old version and restore it.

![Version history](docs/screenshots/version-history.png)

### Everything else

- Paragraph styles (Title, Subtitle, Headings 1–6), fonts and font sizes, bold, italic, underline, colours and highlights.
- Bulleted lists, numbered lists and checklists; tables; images (drag the corners to resize); links; horizontal lines; page breaks.
- Real pages with a ruler, or **Pageless** mode. **File → Page setup** sets Letter, A4 or Legal paper, portrait or landscape, and the margins.
- Comments with replies, find & replace, word count, zoom, a document outline, and a white **Paper preview**.
- Markdown shortcuts as you type: `#` + space for a heading, `-` + space for a bullet, `1.` + space for a numbered list.
- Press **⌘ /** to see all keyboard shortcuts.

---

## Google Docs sync (optional)

**You don't need a Google account to use Write.** Skip this section if you only want to write on your Mac.

If you'd like Write. to work with your Google Docs, you need to give it permission once. Google asks every app to have its own "key", so you create a free one for yourself in Google's console. It takes about 5 minutes.

### Part A — Create your free key in Google Cloud

1. Go to **[console.cloud.google.com](https://console.cloud.google.com/)** and sign in with your Google account. Accept the terms if asked.
2. **Create a project.** Click the project picker at the top of the page, then **New project**. Name it `Write` and click **Create**. Make sure the new project is selected at the top.
3. **Turn on two Google APIs.** Open the menu ☰ → **APIs & Services → Library**.
   - Search for **Google Drive API**, open it, and click **Enable**.
   - Go back, search for **Google Docs API**, open it, and click **Enable**.
4. **Set up the sign-in screen.** Open ☰ → **Google Auth Platform** (it may be called **OAuth consent screen**) and click **Get started**.
   - App name: `Write`. User support email: your email.
   - Audience: **External**.
   - Contact email: your email. Agree to the policy, then click **Create**.
5. **Add yourself as a tester.** Still in Google Auth Platform, open **Audience → Test users → Add users**. Enter the Gmail address you'll sign in with, and click **Save**.
   > ⚠️ If you skip this step, Google shows *"Access blocked … Error 403: access_denied"*.
6. **Create the key.** Open **Clients** (or **APIs & Services → Credentials → Create credentials → OAuth client ID**).
   - Application type: **Desktop app**. Name: `Write Mac`. Click **Create**.
   - Google shows a **Client ID** and a **Client secret**. **Copy both now**, or click **Download JSON**. Google may not show the secret again later.

### Part B — Connect Write.

7. In Write., open **Settings** (press **⌘ ,**). Under **Google Docs**, paste the **Client ID** and the **Client secret**.

   ![Google Docs settings in Write.](docs/screenshots/google-docs-settings.png)

8. Click **Sign in with Google**. Your web browser opens:
   - Choose your Google account.
   - Google says *"Google hasn't verified this app"*. That's expected, because it's your own key. Click **Continue**.
   - Allow access to Google Drive, then return to Write. when the page says *Signed in*.
9. The first time Write. uses your Google sign-in, macOS may ask for your **Keychain** password. Write. stores your sign-in securely in your Keychain. Type your Mac password and click **Always Allow**.

### Using sync

- **Bring in a Google Doc:** on the home screen, click **Import from Google Docs** (or press **⇧ ⌘ O**). All of its tabs come along, and it stays linked.
- **Send a document to Google Docs:** in a document, click **Save to Google Docs** at the top right.
- **Automatic sync:** linked documents sync a few seconds after you stop typing. To sync only when you decide, click **⌄** next to the sync button and choose **Pause auto-sync**. Then click **Sync now** whenever you want.
- If a document was changed in both places, Write. asks which version to keep. Nothing is thrown away: older versions stay in version history.

> **Good to know:**
> - Keep your Client secret private, and don't share it with anyone.
> - While your Google project is in "Testing" mode, Google asks you to sign in again every 7 days. Just click **Sign in with Google** in Settings when that happens.
> - Text, styles, lists and tabs sync both ways. Images and tables come in from Google Docs, but new images and table edits made in Write. stay on your Mac.

---

## Where are my files?

| What | Where |
| --- | --- |
| Your documents (`.write` files) | **Documents → Write** in your home folder. You can choose a different folder, for example one in iCloud Drive, in **Settings → Library**. |
| Settings and version history | `~/Library/Application Support/Write.` |

Your documents never leave your Mac unless you turn on Google Docs sync.

---

## Updating and uninstalling

**To update:** download the newest `.dmg` from the [Releases page](https://github.com/subhodeep2002/Write/releases). Drag Write. into **Applications** again and choose **Replace**. Your documents and settings are kept. You can check for updates any time from **Help → Check for updates…** in Write.

**To uninstall:** quit Write., then drag **Write** from **Applications** to the **Trash**. Your documents stay in **Documents → Write** until you delete them yourself.

---

## Problems and fixes

| What you see | What to do |
| --- | --- |
| *"Write." can't be opened* or *Apple could not verify…* | Follow [Opening it for the first time](#opening-it-for-the-first-time). |
| *"Access blocked: Write has not completed the Google verification process" (Error 403)* | Add your Gmail address under **Audience → Test users** (Part A, step 5). |
| *"Turn on the Google Docs API…"* | Enable the **Google Docs API** in your Google Cloud project (Part A, step 3). |
| macOS asks for your **Keychain** password | Type your Mac password and click **Always Allow**. |
| The app won't open on an older Mac | Write. needs an Apple Silicon Mac (M1 or newer) with macOS 12 or later. |

---

## Licence and copyright

**Copyright © 2026 Write. (Period), powered by Formula0ne.** All rights reserved.
Releases: **https://github.com/subhodeep2002/Write/releases**

![The About window in Write.](docs/screenshots/about.png)

Write. is **free to download and use**. You may share the link to this page, but you may not sell, change or redistribute the app. The source code is private. See [LICENSE](LICENSE) for the full terms.

Write. is built with open-source software, listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Google Docs and Google Drive are trademarks of Google LLC. Write. is an independent app and is not made by, affiliated with or endorsed by Google.
