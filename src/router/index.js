import { createRouter, createWebHistory } from 'vue-router'
// import { gsap } from 'gsap'

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: () => import(/* webpackChunkName: "ContactPage" */ '../views/Home.vue'),
    meta: {
      transition: 'route-slide',
      title: 'Webprofits Portfolio'
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import(/* webpackChunkName: "Portfolio" */ '../views/Portfolio.vue'),
    // component: Portfolio,
    meta: {
      transition: 'route-slide',
      title: 'Portfolio'
    }
  },
  {
    path: '/portfolio/:slug',
    name: 'Portfolio Item',
    component: () => import(/* webpackChunkName: "PortfolioItem" */ '../views/PortfolioItem.vue'),
    // component: PortfolioItem,
    meta: {
      transition: 'route-slide'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: function (to, from, savedPosition) {
    // Scrolling on the same page
    if (to.hash && from.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    // Scrolling when returning from another page
    // Need to wait 350ms to complete the <transition> animations which take 250ms
    // Wait an extra 100ms to be sure that the to.hash is loaded
    // See App.vue
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth'
          })
        }, 350)
      })
    }

    if (savedPosition) {
      return {
        top: savedPosition,
        behavior: 'smooth'
      }
    }

    return {
      top: 0,
      behavior: 'auto'
    }
  },
  routes
})

const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

router.afterEach((to, from) => {
  // Set meta titles
  if (to.params.slug) {
    const docTitle = to.params.slug.replaceAll('-', ' ')
    document.title = `Webprofits Portfolio - ${titleCase(docTitle)}`
  } else {
    document.title = to.meta.title
  }
})

export default router