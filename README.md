# TeaLab
A structured and responsive tea house website built with modern web technologies. Designed for scalability and ease of navigation.

## Points: 2.2
- stage 0: 0.3
- stage 1: 0.5 + 0.35
- stage 2: 0.5
- stage 3: 0.55
- stage 4:

Stage 0:

- [ro] https://docs.google.com/document/d/1fdu3F5taJy_EXOAHF1N9IejOTr1Z_NP42RU3cLqYxOA/edit?usp=sharing

<details>
<summary> Stage 1:</summary>

- [x] Task 1: main folder + index.html

- [x] Task 2: title + meta
    - [x] charset
    - [x] author
    - [x] keywords
    - [x] description

- [x] Task 3:
    - [x] **resources** directory
    - [x] **images** directory
    - [x] favicon

- [x] Task 4: The division of the body into header, main, and footer

- [x] Task 5:
    - [x] Use at least one tag among:
        - [x] section
        - [x] article
        - [ ] aside
    - [x] There must be at least one case of nested section tags
    - [x] Place the heading with the appropriate level corresponding to the level of nesting

- [x] Task 6:
    - [x] navigation system in the header (nav)
    - [x] h1 for the site title in the header

- [x] Task 7: Within the sections, use at least 2 tags from the following grouping tags:
    - [x] p
    - [ ] ol
    - [ ] ul
    - [x] blockquote
    - [ ] dl

- [x] Task 8: Add an image with a description to the page using \<figure> and \<figcaption>
    - [x] Use different image sizes for mobile, tablet, and desktop screens

- [x] Task 9: The text should include all identified keywords

- [x] Task 10: In the text, meet 3 of the following requirements, as chosen:
    - [x] Mark keywords and phrases with the \<b> tag.
    - [ ] Mark idiomatic text (scientific terms, foreign language, technical or jargon terms, etc.) with the \<i> tag.
    - [x] Mark warning text with the \<strong> tag.
    - [x] Mark emphasized text with the \<em> tag.
    - [ ] Mark deleted text (corrected or no longer relevant) with the \<s> tag, and the inserted text with the \<ins>
      tag.
    - [ ] Mark an abbreviation with the \<abbr> tag and the title attribute specifying the expanded form.
    - [x] Mark a defined term with the \<dfn> tag.
    - [x] Mark a quote with the \<q> tag.
    - [ ] Mark the title of a work with the \<cite> tag.

- [x] Task 11: Create the following special links:
    - [x] An external link (it will be in the page content, not in the menu, it will refer to another site, and it will
      open in a new window).
    - [x] A link in the footer to the top of the page.
    - [x] At least two links that open in an iframe (it can be done as in the course example, links that open relevant
      YouTube videos in an iframe). Be careful, this refers to \<a> tags that open in the iframe when clicked, not the
      src of the iframe itself. The iframe will default to one of the resources specified in the links.
    - [x] A download link.

- [x] Task 12: multiple details and summary sections

- [x] Task 13: In the footer, add contact information using the \<address> tag:
  - [x] A fictional phone number
  - [x] A fictional address that, when clicked, opens a location on Google Maps
  - [x] A fictional email address
  - [x] A link that opens a communication (discord) for chat.

- [x] Task 14: In the footer, add copyright information using the \<small> tag, the specific copyright symbol with the
  necessary HTML code, and the creation date of the page, enclosed in the \<time> tag with the corresponding datetime
  attribute.

- [x] Task 15: The page must be syntactically valid. Therefore, check it with the HTML validator. The validator will be
  prepared in a tab during the presentation, and the page will be validated instantly.

---

**Bonuses**:
- [x] Use a formula written in MathML
- [x] Display a PDF on the page using the \<embed> or \<object> tag
- [x] Create an image map using the \<map> and \<area> tags
- [x] Add an iframe with the location marked on Google Maps for the faculty address (from a previous subpoint)

</details>

---

<details>
<summary>Stage 2:</summary>

- [x] (0.025) Chromatic scheme Task - https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373
- [x] (0.15) Layout Task
  - [x] Zone1: Welcome + map
  - [x] Zone2: Short description
  - [x] Zone3: Tutorials
  - [x] Zone4: Calendar
  - [x] Zone5: Products
  - [x] Zone6: Services
  - [x] Zone7: Location
  - [x] Zone8: Menu (PDF) / table
- [x] (0.05) Basic Task Design:
  - [x] Using CSS variables, add padding to the left and right of the page. The padding should be identical on both sides. The padding will be smaller on medium screens and minimal on small screens.
  - [x] Use grid-gap to create spacing between the grid cells of the page. The spacing should decrease on medium and small screens.
  - [x] Visually isolate the areas of the page: header, footer, and grid areas using at least three of the following CSS effects: background color (chosen from the color scheme) for different areas, borders, rounded corners for the box, and box-shadow.
  - [x] Use padding to distance the text from the borders of the areas. The padding should be the same for all text areas. Use CSS variables if you cannot achieve this with simple selectors.
  - [x] Media elements (images, videos, etc.) that come with a preset width should be given a width in percentages, while also setting a maximum and minimum width for them to avoid undesirable visual effects. These values may differ depending on the screen size.
- [x] (0.025) Icons and external font
  - [x] External font using Google API
  - [x] Static icon
  - [x] Animated icon

- [ ] (0.05) Table
  - [x] Caption under the table using CSS
  - [x] Alternating border color (on columns)
  - [x] The thickness of the border separating the thead area from the tbody area, as well as the tbody area from the tfoot area, should be 2 or 3 times larger than the thickness of the regular row borders.
  - [x] When hovering over a row with the cursor, a box-shadow will gradually appear inside it, fully overlapping the row.
  - [ ] On small screens, the table will be placed inside a container with a horizontal scrollbar.

- [x] (0.05) Tab-stylization

- [x] (0.05) Link top

---

**Bonuses 2**
- [ ] (0.05)
- [ ] (0.05)

</details>

---

<details>
<summary>Stage 3:</summary>

- [x] (0.25) Menu task
  - [x] Demanded menu hover transition
  - [x] Medium and small screen changes
  - [x] Hamburger on small screen
  - [x] Clip-path visibility
- [x] (0.15) Print style
  - [x] The banner should be displayed at the bottom of the first page, centered horizontally, spanning 70% of the page width, with a black inset border of 4px.
  - [x] Images, videos, iframes, and other media elements, along with elements dependent on them, will be hidden. The link to the top of the page will also be hidden.
  - [x] The page grid will be displayed as a block to prevent sectioned cells from appearing in printed pages.
  - [x] All links on the page will appear as normal text.
  - [x] The level 1 heading will be on the first page, centered horizontally. Below it, the menu will be displayed as an unordered list with items stacked one below the other. After the menu, a page break will be inserted. Before the footer, there will also be a page break.
  - [x] Each page will have a "watermark" containing your name. This will have a width of 4 cm of the page width and a height of 1 cm of the page height. It will be displayed in the bottom-right corner of each page, with a solid 3px border and rounded corners. The text inside will be centered horizontally, bold, and have an opacity of 0.4.
  - [x] When printing, the left-side pages (in print preview) should have a left margin of 3 cm and a right margin of 1 cm, while the right-side pages should have a right margin of 3 cm and a left margin of 1 cm.

---

**Bonuses 3**
- [x] (0.05) "hamburger" icon for menu using 3 divs/spans
- [x] (0.05)
- [x] (0.05)

</details>

---

<details>
<summary>Stage 4:</summary>

- [x] npm init
- [x] index.js
- [x] show __dirname, __filename and process.cwd()
- [x] views dir > pages + fragments dir
- [x] index.ejs, head.ejs, header.ejs, footer.ejs
- [x] static dir resource
- [x] rename all paths so they will no longer be relative, but a request to the server
- [x] first page (index), must be accessible with
  - [x] localhost:8080
  - [x] localhost:8080/index
  - [x] localhost:8080/home
- [x] declare an app.get() for \"/*\"
  - [x] if the page don't exist, render a special page for 404 error
  - [x] use a callback function as argument in render function which in case of "Fail to lookup view" shows the 404 error page; else if other error exist the generic error page; else if there are no errors show the result of the search
- [x] for error rendering use a json directory \"errors.json\" with:
  - [x] default_path: path to images corresponding to the errors
  - [x] default_error: JSON object with: title, text, image
  - [x] info_errors: object vector, each object describes an error with: identifier, status, title, text, image
- [x] create a template \"error.ejs\" to show the errors
  - [x] this will take form locals: the title, the text and the image of the error
- [x] global variable named _obGlobal_ of object type
  - [x] property _obErrors_ with default value of _null_
- [x] function named _initErrors()_ which read the JSON with the errors and creates a corresponding object with all 
  the errors details; this object will be saved as the obErrors property of the obGlobal; for every error set the 
  absolute path in the _image_ property
- [x] error showing function named _showErrors()_ that will take an object of the response type, the identifier, the 
  title, the text and the error's image
  - [x] if there is any error with that identifier and the title,text and image are not specified, the data is 
    load form the JSON
  - [x] if the identifier is not specified show the error page with the default_error specification
- [x] create a second page that can be accessed form the menu and transmit a get request
- [x] show the user ip on the site
- [x] for a request like /resource/css return 403, if there is no specified file
- [x] for every request for a .ejs file transmit a 400 error
- [x] add and app.get() for \"favicon.ico\"
- [x] make a vector with all the names of the directories that will hold files that are generated
- [x] video
- [x] link


</details>