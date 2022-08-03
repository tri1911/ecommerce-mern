# Notes along the way of building this project

## Shared

### App Architecture

- [Full-stack boilerplate reference from FSO course](https://github.com/fullstack-hy2020/create-app)
- [Full-stack boilerplate from mohamedsamara on Github](https://github.com/mohamedsamara/react-node-typescript)
- [App Generator](https://github.com/iamturns/create-exposed-app)
- [Organizing Express.js Project](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/) - [Github Link](https://github.com/geshan/expressjs-structure)
- [React App Architecture](https://blog.openreplay.com/react-architecture-patterns-for-your-projects)
- [Better Express Routing for Node.js](https://caffeinecoding.com/better-express-routing-for-nodejs/)

### Questions

- [Use library or write your own?](https://stackoverflow.com/questions/1236256/how-do-you-decide-whether-to-use-a-library-or-write-your-own-implementation)
- [Should use library or implement from scratch?](https://www.reddit.com/r/learnprogramming/comments/awgf53/when_should_i_be_using_libraries_rather_than/)
  - [Does anyone else not like using libraries?](https://www.reddit.com/r/learnprogramming/comments/rojkr0/does_anyone_else_not_like_using_libraries/)
- How structure the mern project (where to put clien, server)?
- Should create shared types among `client` and `server`?
- [Why should user undefined instead of null](https://writingjavascript.com/why-you-should-always-use-undefined-and-never-null)
- [Difference btw jwt decode and verify](https://www.googlecloudcommunity.com/gc/Apigee/What-is-the-difference-between-DecodeJWT-and-VerifyJWT/m-p/47537#:~:text=the%20VerifyJWT%20policy%20verifies%20digitally,validating%20signatures%20on%20the%20token.)

### Lessons

- Start small, not be so ambitious -> avoid losing motivation & procrastination
- Start on the UI interface first to know which data we want?
- Focus on implementing only one feature at the time

### References

#### E-commerce sites

- [Vessi](https://ca.vessi.com/)
- [Allbirds](https://www.allbirds.com/)
- [HM](https://www2.hm.com/)
- [Tiki](https://tiki.vn/)

#### E-commerce Projects

- [Bradtraversy](https://github.com/bradtraversy/proshop_mern)
- [Mern E-Commerce Example](https://mern-store-80202.herokuapp.com/)

### To-learn deeper (later)

- React Router v6
- Redux toolkit tutorials
- [Formik](https://formik.org/docs/overview)
- MongoDB & mongoose
- React Bootstrap?

### To-Read

- [efficient workflow with eslint, typescript](https://indepth.dev/posts/1282/setting-up-efficient-workflows-with-eslint-prettier-and-typescript)
- [user authentication libraries](https://blog.bitsrc.io/6-javascript-user-authentication-libraries-for-2019-6c7c45fbe458)

### TypeScript & JavaScript

- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Iterate over Union Type](https://stackoverflow.com/questions/43067354/how-to-iterate-a-string-literal-type-in-typescript)
- [Compare two objects in js](https://www.educative.io/answers/how-to-compare-two-objects-in-javascript)
- Create a [range of number](https://www.technicalfeeder.com/2021/07/how-to-generate-number-range-array-int-and-float/)
  - can write like so `Array.from({length: 5}, (v, i) => i);`

### Markdown

- [Basic Syntax](https://www.markdownguide.org/basic-syntax/)

### Git

- [Git Handbook](https://docs.github.com/en/get-started/using-git/about-git)
- [Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0/)
- How to [write commit messages](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)
- [Multiple paragraph in commit message](https://www.youtube.com/watch?v=MOfBw3eGC08)
- [Add line break in commit message](https://stackoverflow.com/questions/5064563/add-line-break-to-git-commit-m-from-the-command-line)

### Algorithms

- [Search Suggestion](https://leetcode.com/problems/search-suggestions-system/)

## Front-end

### UI Template, Tutorial as References

- [Tutorial](https://www.youtube.com/playlist?list=PLzBl445W4ieshIswFhOOTwnbvlEhQPc81)
  - [Demo Link](http://www.templatemonsterpreview.com/demo/181186.html)
  - [Live Demo](http://rafcart.rslahmed.com/index-1.html)

### TypeScript Setup

- [create-react-app - Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/)

### Tasks

#### Pages

- [x] Home Page
- [x] Shop Page
- [x] Shop By Category
- [x] Login & Register Page
- [x] Shopping Cart Page
- [x] My Account Page
- [x] Manage Account
- [x] Profile Info
- [x] Edit Address
- [x] Change Password
- [x] Checkout
- [x] Order Complete
- [x] Reviews & QA tab views within the Single Product Page
- [x] Order History
- [x] My Cancellations
- [x] Write/Edit Review Details
- [x] Track Order
- [x] Order Info Details
- [x] Order Return List & Details
- [x] FAQ
- [x] Payment processing page
- [x] Edit Payment Methods & Voucher
- [x] Contact us
- [x] About us

#### UI Features

- [x] Finish the sorting and filtering functionality in ShopPage
- [x] List & grid mode toggle
- [x] Show products by category
- [x] order specifications state in single product page using a object {size, color, quantity} instead of 3 separate states
- [x] Forms with formik
- [x] Adjust `Add to Cart` button only show when hovering to product card
- [x] Price range slider
- [x] Size & Color `Filters` = checkbox & `Selections` are radio
- [x] Deselect the color & size filters when re-clicking (pretty straightforward if they are checkboxes)
- [x] `Product Quick View` Modal
- [x] Shopping Cart: Drawer - in Mobile screen & Dropdown in large screen
- [x] Pagination
- [] make the `New Arrival` section horizontally scrollable -> use `Swiper.js`?

- [x] Make the price filter work in `ShopPage`
- [] Fix `Filter` toggle in mobile mode - [] `Gallery Slide` banner in `Home` Page - [] `Image Gallery Slide` within the `Sinlge Product Page` - [] `Sign In` modal when checking out

- [] Disable the submit button while the user has attempted to submit (hint: formik.isSubmitting)
- [] Add a reset button with formik.handleReset or `<button type="reset">`
- [] Change the input border color to red when a field has an error and isn’t focused
- [] Persist form state to the browser’s sessionStorage so that form progress is kept in between page refreshes

- [] Animation when clicking on the heart icon to add product into wishlist
- [] Custom select component
- [] Language & Currency dropdown
- [] Account Dropdown
- [] Search recommendations
- [] Search product in `All` or by `category`
- [] `See more` button on `New arrival` products section

#### State management

- [x] Products Slice
- [x] Categories slice
- [x] Cart Slice
- [x] Wishlist slice
- [x] Current User Login slice - register & login actions

### Questions

- Is the internal state of an element is persistent (e.g. the check box is still checked while going to another page & then come back)
- For searching, does it necessarily to send the search query to server? or just filter through the locally fetched list of products?
- Should put the `Shopping Cart` modal visibility control within Redux? (the same question for the `Quick View` modal)
- Save `product items` as array or dictionary? (normalize data)
- For filtering, should use url search param or component's local state?
- For single product data, should we fetch from backend api or just search from the list in Redux store?
  - [Where to get product details](https://stackoverflow.com/questions/67500139/redux-should-i-get-product-details-from-state-or-api-call)
- Filter or Search query on front-end or back-end?
  - [Should filter on backend api or on the list redux store?](https://stackoverflow.com/questions/49714533/should-i-query-and-filter-on-the-back-end-rails-api-or-front-end-react-redux)
  - [Filters logic on front-end or back-end?](https://stackoverflow.com/questions/52346685/filters-logic-should-be-on-frontend-or-backend)

### Loading Skeletons

- [Animated loading skeletons](https://delba.dev/blog/animated-loading-skeletons-with-tailwind)

### Debouncing

- [Debounce user input](https://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up)
- [React Throttle & Debounce](https://dmitripavlutin.com/react-throttle-debounce/)
- [Freecodecamp](https://www.freecodecamp.org/news/javascript-debounce-example/)
- [Geeksforgeeks](https://www.geeksforgeeks.org/how-to-perform-debouncing-in-reactjs/#:~:text=A%20Debouncing%20Events%20in%20ReactJS,wait%20for%20a%20bit%E2%80%9D%20behavior.)
- [debounce useEffect](https://stackoverflow.com/questions/61785903/problems-with-debounce-in-useeffect)
  - [code-sandbox](https://codesandbox.io/s/blue-bush-bh006?file=/src/App.js)

### Pagination component

- [Tailwind UI](https://tailwindui.com/components/application-ui/navigation/pagination)
- [react-paginate](https://github.com/AdeleD/react-paginate)
- [Build a custom pagination component](https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/)

### React Router v6

- [Redirect in React Router](https://stackoverflow.com/questions/69868956/how-to-redirect-in-react-router-v6)
- [URLSearchParams in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Optional Parameter in v6](https://stackoverflow.com/questions/70005601/alternate-way-for-optional-parameters-in-v6)

### Redux

- [createEntityAdapter api](https://redux-toolkit.js.org/api/createEntityAdapter)
- [Usage with TypeScript](https://redux.js.org/usage/usage-with-typescript)
- [Error Handler in createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors)
- [Optimize Selector](https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization)

#### Redux-persist

- [Redux-presist and RTK](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)

### axios

- [type AxiosError](https://github.com/axios/axios/issues/3612)

### Filter & Searching (React)

- [React filter practices](https://stackoverflow.com/questions/55204504/react-filter-best-practices)
- [Movie search app with react + elasticsearch](https://medium.appbase.io/how-to-build-a-movie-search-app-with-react-and-elasticsearch-2470f202291c)

### Tailwind components libraries

- [Open Source tailwind components](https://www.reddit.com/r/tailwindcss/comments/vxhiow/creating_an_opensource_tailwind_components_library/)
- [Headless UI](https://headlessui.dev/)
- [Tailwind UI](https://tailwindui.com/)
- [Tailwind-elements](https://tailwind-elements.com/docs/standard/forms/range/)
- [DaisyUI](https://github.com/saadeghi/daisyui)
- [Flowbite](https://flowbite.com/)
- [Flowbite - React components](https://github.com/themesberg/flowbite-react/tree/main/src/lib/components)
- [Alert](https://v1.tailwindcss.com/components/alerts)

### Icons

- [Heroicons](https://heroicons.com/)
- [Heroicons usage](https://github.com/tailwindlabs/heroicons)
- [Material UI with badge](https://mui.com/material-ui/react-badge/)

### Range Slider (for Price Filter)

- [Price Range with vanilla JS](https://www.youtube.com/watch?v=FShnKqPXknI)
  - [Code](https://www.codingnepalweb.com/price-range-slider-html-css-javascript/)
- [React Slider](https://mui.com/material-ui/react-slider/)
- [For Nextjs & Tailwindcss](https://www.youtube.com/watch?v=Fzyf_H_mWy4&t=61s)
- [Access thumb from input range](https://www.reddit.com/r/tailwindcss/comments/lc8e4b/accessing_thumb_from_input_range_in_tailwindcss/)
- [Style input range](https://www.cssportal.com/style-input-range/)

### Shopping Cart Drawer (side-overs)

- [Shoping Cart with React](https://www.youtube.com/watch?v=sfmL6bGbiN8&t=796s)
- [Drawer](https://codesandbox.io/s/bjbfr?file=/src/Drawer.js)
- [Side Over](https://tailwindui.com/components/application-ui/overlays/slide-overs)

### Checkout Flow

- [commerlayer-react-checkout](https://github.com/commercelayer/commercelayer-react-checkout)
- [Build a checkout form in React](https://emilyxiong.medium.com/step-to-step-guide-on-building-a-checkout-form-in-react-5f28af1c1fdf)

#### Stepper

- [Stepper with Tailwindcss](https://www.kindacode.com/snippet/tailwind-css-how-to-create-a-stepper/)

### Modal / Dialog - Single Product View

- [headlessui](https://headlessui.com/react/dialog)
- [tailwind ui](https://tailwindui.com/components/application-ui/overlays/modals)
- [Use Redux to control modal visibility](https://betterprogramming.pub/react-use-redux-to-control-modal-visibility-states-8953e44b71fd)

### Tab View within Single Product View

- [Headless UI](https://headlessui.dev/react/tabs)
- [Tailwind UI](https://tailwindui.com/components/application-ui/navigation/tabs)
- [on Codepen](https://codepen.io/ilyosjon/pen/vYYZeEj)

### Dropdowns

- [Tailwind creator tutorial](https://www.youtube.com/watch?v=fx2lbOCAqrg)
- [Tailwind Lab - HeadlessUI](https://www.youtube.com/watch?v=qJnIJa-cF2M)

### Reviews / Rating component

- [Tailwind UI](https://tailwindui.com/components/ecommerce/components/reviews)
- [Rating component in React](https://www.youtube.com/watch?v=eDw46GYAIDQ)
- [dev.to - custom rating component](https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6)
- [react-rating-stars-component](https://www.npmjs.com/package/react-rating-stars-component)

### Popover & Tooltip

- [Popover](https://headlessui.com/react/popover)
- [Position the panel](https://popper.js.org/react-popper/)
- [Tooltip](https://simplernerd.com/tailwind-css-tooltip-react-next-js/)
- [issue with typescript](https://github.com/floating-ui/react-popper/issues/415)

### Timeline

- [Coding Nepal Youtube](https://www.youtube.com/watch?v=-uzOuGlUfDQ)
- [Thirus Youtube](https://www.youtube.com/watch?v=BaX22-XuPkc&t=622s)

### Carousel / Slide

- [Flowbite](https://github.com/themesberg/flowbite-react/blob/main/src/lib/components/Carousel/index.tsx)
- [Flowbite - React doc](https://flowbite-react.com/carousel)
- [Swiper library](https://swiperjs.com/react)
  - [Github link](https://github.com/nolimits4web/Swiper)
- [Tutorial that uses Swiper.js (at 34:11)](https://www.youtube.com/watch?v=5d6ZMzBegCU)
- [slick library](https://github.com/kenwheeler/slick)

### Product Card

- [HartDev - Youtube](https://www.youtube.com/watch?v=lQI3x2x012Y&t=31s)

### Formik

- [Formik component api](https://formik.org/docs/api/formik)
- [useField api](https://formik.org/docs/api/useField)
- [useField in TypeScript](https://stackoverflow.com/questions/61089182/how-to-properly-use-usefield-hook-from-formik-in-typescript)

#### Yup - Validation

- [Yup github](https://github.com/jquense/yup)
- [Confirm password with Yup](https://stackoverflow.com/questions/61862252/yup-schema-validation-password-and-confirmpassword-doesnt-work)
- [Phone number validation](https://stackoverflow.com/questions/52483260/validate-phone-number-with-yup)

### CSS

- [CSS naming convention](https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/#:~:text=They%20may%20be%20seen%20as,followed%20by%20the%20element%20name.)
- [Sementic class naming](https://ukiahsmith.com/blog/semantic-class-naming/#:~:text=Semantic%20class%20naming%20is%20a,as%20possible%2C%20but%20not%20simpler.)

### Libraries

- [date-fns library](https://www.npmjs.com/package/date-fns)

### Others

- [Fake API](https://fakestoreapi.com/)
- [404 Not Found Page](https://naveenda.medium.com/creating-a-custom-404-notfound-page-with-react-routers-56af9ad67807)
- [Radio Buttons in React](https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs)
- [Multiple checkboxes have the same name](https://www.dyn-web.com/tutorials/forms/checkbox/same-name-group.php#:~:text=When%20grouping%20checkboxes%20and%20giving,would%20be%20available%20upon%20submission.)
- [re-export](https://riptutorial.com/typescript/example/28620/re-export)
- [Wrapper and Container](https://css-tricks.com/best-way-implement-wrapper-css/#:~:text=%E2%80%9CWrapper%E2%80%9D%20vs%20%E2%80%9CContainer%E2%80%9D&text=In%20programming%20languages%2C%20the%20word,functionality%20and%20interface%20to%20it.)
- [Spread JSX attributes](https://dev.to/jimjja/lose-coupling-abstractions-in-react-using-typescript-397o)
- [Admin Dashboard](https://www.youtube.com/watch?v=BOF79TAIkYQ)
- [URL State in React](https://pierrehedkvist.com/posts/react-state-url)

### Issues

- [react router optional param](https://stackoverflow.com/questions/70005601/alternate-way-for-optional-parameters-in-v6)
- [how to use updateOne of entity adapter redux toolkit](https://github.com/reduxjs/redux-toolkit/issues/464)
- [Pick and rename key](https://stackoverflow.com/questions/59071058/how-to-pick-and-rename-certain-keys-using-typescript)
- [Difference between change and input events](https://stackoverflow.com/questions/17047497/difference-between-change-and-input-event-for-an-input-element)
- [Validate numeric input](https://stackoverflow.com/questions/51770246/how-to-validate-numeric-inputs-in-reactjs)
- [useRef - not assignable to type legacy ref](https://stackoverflow.com/questions/66963289/useref-typescript-not-assignable-to-type-legacyrefhtmldivelement)
- [Disable hover when the button is disabled](https://github.com/tailwindlabs/tailwindcss/discussions/3574)
- [Format Date as yyyy-MM-dd](https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd)
- [useState Lazy Initialization](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)
- [Can't call the AsyncThunkAction](https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete)

## Backend

### Tasks

- [x] Products model
- [x] Fetch all products
- [x] Single product
- [x] User authentication
- [x] User Profile
- [x] Categories
- [] Wishlist

- [] replace yup with zod in formik forms
- [] re-organize the learning notes
- [] determine which icon library to use and get rid of the rest

### Courses / Tutorials

- [Coursera - Meta backend course](https://www.coursera.org/professional-certificates/meta-back-end-developer#courses)
- [Airbnb-like Site](https://www.newline.co/tinyhouse#pricing)
- [E-commerce with Django](https://www.youtube.com/watch?v=YZvRrldjf1Y)

### REST api Guidelines

- [How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
- [CRUD api with Node.js, TypeScript](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/)
- [Freecodecamp](https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/)
- [Stackoverflow](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [Hackernoon](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)
- [Best Practices for Designing a Pragmatic RESTful API](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [TomDoesTech - REST api with TypeScript](https://www.youtube.com/watch?v=BWUi6BS9T5Y) - [Github Link](https://github.com/TomDoesTech/REST-API-Tutorial-Updated)

#### Filtering, Sorting, Pagination

- [Jeff Devs Life](https://jeffdevslife.com/p/1-mongodb-query-of-advanced-filtering-sorting-limit-field-and-pagination-with-mongoose/)
- [Moesif](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/)
- [Advanced Filtering Tutorial - The Full Stack Junkie](https://morioh.com/p/2fdd82a475d8)

#### Web Security / User Authentication & Authorization

- [Salt and Hash password with bcrypt](https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/)
- [Compare jwt & session mechanisms](https://stackoverflow.com/questions/43452896/authentication-jwt-usage-vs-session#:~:text=JWT%20doesn't%20have%20a,doing%20it%20on%20the%20server.)
- [JWT authentication for Node, TypeScript App](https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/)
- [Login Example with React Redux](https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/)
- [Node.js Role-based Authorization](https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api)
- [Authorization with Express middleware](https://caffeinecoding.com/leveraging-express-middleware-to-authorize-your-api/#more-and-more-middleware)
- [Security Essentials](https://restfulapi.net/security-essentials/)
- [Auth Best Practices](https://stackoverflow.blog/2021/10/06/best-practices-for-authentication-and-authorization-for-rest-apis/)

- [Secure Express api](https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/)
- [Authentication with Auth0, Passportjs](https://auth0.com/blog/create-a-simple-and-secure-node-express-app/)
- [Authenication with auth0-express-openid library](https://auth0.com/blog/complete-guide-to-nodejs-express-user-authentication/)

##### Authentication with Passport.js

- [How to use Passport.js](https://www.reddit.com/r/node/comments/rk3o1g/can_anyone_help_me_understand_how_to_use/)
- [Tutorial for implementing Google OAuth 2.0 along with JWT in Node app](https://www.makeuseof.com/nodejs-google-authentication/)
- [Using OAuth 2.0 along with JWT in Node/Express](https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed)
- [Google Authentication with Nodejs & passport.js](https://www.loginradius.com/blog/engineering/google-authentication-with-nodejs-and-passportjs/)
- [Google OAuth2 Strategy Implementation](https://github.com/jaredhanson/passport-google-oauth2)
- [Why passport authenticate() get called twice](https://stackoverflow.com/questions/26268271/why-is-passport-authenticate-called-twice)
- [Example Passport.js, Facebook OAuth](https://github.com/passport/express-4.x-facebook-example)
- [What is passport.initialize()](https://stackoverflow.com/questions/46644366/what-is-passport-initialize-nodejs-express)
- [Passport Confusion](https://stackoverflow.com/questions/24376484/passport-js-session-confusion)
  - [tutorial](https://www.digitalocean.com/community/tutorials/easy-node-authentication-setup-and-local)
- [authenticate() implementation](https://github.com/jaredhanson/passport/blob/0b3931330e245d8e8851328a7dc436433d6411c9/lib/middleware/authenticate.js#L171)
- [Passport: The Hidden Manual](https://github.com/jwalton/passport-api-docs)

#### REST api references

- [Jira](https://developer.atlassian.com/cloud/jira/software/rest/intro/)
- [Notion](https://developers.notion.com/reference/intro)
- [Fabric](https://knowledgebase.fabric.inc/docs/openapi/oms/reference/#tag/Cart)
- [Shopify](https://shopify.dev/api/ajax/reference/cart)

### Miscellaneous

#### Node config

- [nodejs config file](https://www.delftstack.com/howto/node.js/nodejs-config-file/)
- [node config best pratices](https://codingsans.com/blog/node-config-best-practices)
- [How to use node-config in TypeScript](https://techhelpnotes.com/node-js-how-to-use-node-config-in-typescript/)

#### Eslint config

- [eslint for typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)

#### Path Mapping

- [Path aliases with TS in Node](https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353)
- [Path mapping in TypeScript](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Fix Issue with ts-node-dev](https://medium.com/@fmoessle/typescript-paths-with-ts-node-ts-node-dev-and-jest-671deacf6428)

### Validation (for requests)

- [Schema Validation with Zod and Express.js](https://dev.to/imadatyat/schema-validation-with-zod-and-expressjs-240i)
- [Schema Validation with Zod and Express.js](https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p)
- [Zod Validate for instance of ObjectId](https://github.com/colinhacks/zod/issues/318)

### Database Model Design (with MongoDB)

#### E-Commerce

- [Building a MongoDB NoSQL E-Commerce Data Model](https://hackernoon.com/building-a-mongodb-nosql-e-commerce-data-model-fn8135bc)
  - [Google Product data specification](https://support.google.com/merchants/answer/7052112?hl=en&ref=hackernoon.com)
- [Example of Good E-Commerce Database Design](https://fabric.inc/blog/ecommerce-database-design-example/)
- [Building a NoSQL E-Commerce Data Model](https://fabric.inc/blog/nosql-ecommerce-data-model/)
- [Data Modeling for E-ecommerce Site](https://stackoverflow.com/questions/54339223/data-modelling-for-ecommerce-website-in-mongodb)
- [Product Model with different attributes](https://www.mongodb.com/community/forums/t/ecommerce-product-custom-options-help-needed/132488)
- [Product Model with different attributes](https://stackoverflow.com/questions/33695269/how-to-define-varying-attributes-for-a-product-system-in-mongoose-node-js)

#### Shopping Cart

- [How to design Shopping Cart Database?](https://fabric.inc/blog/shopping-cart-database-design/)
- [Store Cart in Local Storage or Database?](https://stackoverflow.com/questions/2827764/ecommerceshopping-cartwhere-should-i-store-shopping-cart-data-in-session-or)
- [Is it safe to store cart in local storage?](https://www.reddit.com/r/webdev/comments/pj36sr/is_it_safe_to_store_shopping_cart_items_in/)
- [Shopping cart - Schema Design Book](http://mongodb.github.io/node-mongodb-native/schema/chapter10/)

#### MongoDB

- [Polymorphic pattern](https://www.mongodb.com/developer/products/mongodb/polymorphic-pattern/)
- [Attribute Pattern](https://www.mongodb.com/developer/products/mongodb/attribute-pattern/)
- [Update with Aggregation Pipeline](https://www.mongodb.com/docs/upcoming/reference/method/db.collection.update/#update-with-aggregation-pipeline)

#### mongoose

- [Discriminators in mongoose](https://mongoosejs.com/docs/discriminators.html)
- [Generate slug for mongoose schema](https://stackoverflow.com/questions/59798437/how-to-generate-a-slug-everytime-an-article-is-created-and-saved-in-the-database)
  - [mongoose-slug-generator](https://www.npmjs.com/package/mongoose-slug-generator)
  - [slugify](https://github.com/simov/slugify)
- [Create slug in schema](https://www.thiscodeworks.com/create-a-slug-and-add-a-slug-to-mongoose-schema-express-nodej-mongodb-mongoose-slug-url/60c749bd3b8c8500149c0cbb)
- [mongoose: this in instance methods](https://stackoverflow.com/questions/65704763/typescript-mongoose-this-not-available-in-instance-methods)
- [Working with Mongoose in TS](https://thecodebarbarian.com/working-with-mongoose-in-typescript.html)

#### Nested Categories

- [Nested Categories in MongoDB](https://stackoverflow.com/questions/14966777/most-efficient-way-to-store-nested-categories-or-hierarchical-data-in-mongo)
- [Nested Categories - Schema Design Book](https://mongodb.github.io/node-mongodb-native/schema/chapter8/)
- [MongoDB Manual Tutorial](https://www.mongodb.com/docs/manual/tutorial/model-tree-structures-with-materialized-paths/)
- [mongoose plugin](https://github.com/vikpe/mongoose-mpath) from this [post](https://stackoverflow.com/questions/59008372/querying-nested-object-arrays/59009854#59009854)
- [Category & sub-categories design](https://stackoverflow.com/questions/31623575/database-design-categories-and-sub-categories)

#### Sample Dataset

- [Rich ecommerce Product Dataset](https://www.reddit.com/r/datasets/comments/9wc0sz/looking_for_a_rich_ecommerce_product_dataset/)
- [Ecommerce Dataset](https://ganeshrajum.blogspot.com/2022/05/best-ecommerce-datasets-databases.html)

### Paypal Integration

- [Standard payments with JS frameworks](https://developer.paypal.com/docs/checkout/standard/customize/single-page-app/)
- [react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js)
- [tutorial](https://www.youtube.com/watch?v=AGDaLOawJSc)
- [examples](https://paypal.github.io/react-paypal-js/?path=/docs/example-paypalbuttons--default)

### Libraries

- [express-zod-api](https://github.com/RobinTail/express-zod-api)
- [End-to-end type safe](https://trpc.io/)

### Others

- [Error.captureStackTrace](https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt)
- [Proxy to backend server for React app](https://medium.com/bb-tutorials-and-thoughts/react-how-to-proxy-to-backend-server-5588a9e0347#:~:text=In%20React%2C%20the%20create%2Dreact,calls%20based%20on%20the%20URL.)
- [Task Lists in Markdown](https://github.blog/2014-04-28-task-lists-in-all-markdown-documents/)

### Issues

- [Functions that returns promises where a void return is expected](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-promises.md)
- [Not all the code paths return value](https://stackoverflow.com/questions/51446242/how-to-fix-the-issue-not-all-the-code-paths-return-value)
- [Type annotation for res body](https://stackoverflow.com/questions/48027563/typescript-type-annotation-for-res-body)
- [Enum in mongoose with TypeScript](https://github.com/Automattic/mongoose/issues/9535)
- [Add user to Request Object in TypeScript project](https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request)
- [Set new property on Express Request](https://www.kindacode.com/article/express-typescript-extending-request-and-response-objects/)
- [Access data in decode jwt](https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data)
- [Chalk error](https://stackoverflow.com/questions/70309135/chalk-error-err-require-esm-require-of-es-module)

### Questions

- [Choose bcrypt or bcryptjs?](https://github.com/kelektiv/node.bcrypt.js/issues/705)
