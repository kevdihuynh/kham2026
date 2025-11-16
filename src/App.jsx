import { useState, useEffect, useRef } from 'react'
import './App.css'
import collageImage from './assets/collage.svg'

const spreads = [
  {
    id: 'glossary',
    left: {
      label: 'Home',
      heading: 'The Wedding of',
      title: 'Allysha & Kevin',
      subtitle: 'September 18, 2026',
      location: 'Wai Kai · Oʻahu, Hawaiʻi',
      accent: 'A celebration by the water, wrapped in tropical greens.',
    },
    right: {
      collage: true,
    },
  },
  {
    id: 'welcome',
    left: {
      label: 'Welcome',
      heading: 'Aloha, dear family & friends',
      body: [
        'We are so excited to invite you to celebrate our wedding in beautiful Hawaiʻi.',
        'Surrounded by lush greenery, ocean breezes, and the spirit of aloha, we cannot wait to share this special day with you.',
      ],
    },
    right: {
      label: 'Details at a glance',
      listTitle: 'Wedding Day',
      list: [
        ['Date', 'Friday, September 18, 2026'],
        ['Location', 'Wai Kai, Oʻahu, Hawaiʻi'],
        ['Dress Code', 'Tropical formal – breezy, elegant, and island inspired'],
      ],
      note: 'Please arrive early to take in the views and enjoy a welcome drink.',
    },
  },
  {
    id: 'cover',
    left: {
      label: 'Our wedding story',
      storyTitle: 'This is our Story Of how we met',
      body: [
        'So alright, dis how it wen happen.',
        'Our whole love story?',
        'Started wit Kevin… on da toilet.',
        '(Real classy, yeah?)',
        'He was one date away from giving up on Bumble forever. Had enough. Pau. But he gave da app one last mercy scroll — and den BOOM.',
        'He seen her.',
        'Allysha, smiling big-big in one sunflower field like she jus walked outta one Disney movie.',
        'Instant choke butterflies. Instant hope. Instant “okay maybe I no delete dis app yet.”',
        'Meanwhile, Allysha had jus moved from Hawai‘i to Seattle, starting her nursing career in Tacoma, missing home like crazy. She wasn’t expecting much from Bumble… but den Kevin wen slide in wit his iconic first message:',
        '“So… you think you get Moana Syndrome since you left da islands?”',
        'She thought it was one REAL medical diagnosis.',
        'He was dying laughing.',
        'Match made in coconuts.',
        'From dat message, everything jus clicked — da laughs, da vibe, da kine comfort dat felt like home even though both of dem stay freezing in Washington.',
        'And da rest?',
        'Shoots, you already know — history, romance, plenty grindz, plenny laughs, and now… one wedding.',
        'We so stoked you here to celebrate wit us.',
      ],
    },
    right: [
      { videoId: '58TE2RUO53Q' },
      { videoId: 'xnv3Jfah9sY' },
      { videoId: 'T03NTMmlJgQ'}
    ],
  },
  {
    id: 'schedule',
    left: {
      label: 'The Day',
      heading: 'Schedule',
      timeline: [
        ['4:00 PM', 'Guest arrival & welcome refreshments'],
        ['4:30 PM', 'Oceanfront ceremony'],
        ['5:30 PM', 'Cocktail hour among the palms'],
        ['6:30 PM', 'Dinner reception & toasts'],
        ['8:00 PM', 'Dancing under the stars'],
      ],
    },
    right: {
      label: 'Vibe',
      heading: 'Tropical evening by the water',
      body: [
        'Our ceremony and reception will be outdoors, so we recommend light, breathable fabrics.',
        'Block heels or dressy sandals are perfect for strolling along pathways and lawn.',
      ],
    },
  },
  {
    id: 'venue',
    left: {
      label: 'Venue',
      heading: 'Wai Kai',
      body: [
        'Wai Kai is a stunning waterfront destination on the west side of Oʻahu, where the lagoon meets the sea.',
        'Expect sweeping views, warm trade winds, and a setting wrapped in tropical foliage.',
      ],
    },
    right: {
      label: 'Getting there',
      listTitle: 'Travel Notes',
      list: [
        ['Airport', 'Daniel K. Inouye International Airport (HNL)'],
        ['Area', 'We recommend staying on the west side or in Honolulu/Waikīkī'],
        ['Transport', 'Ride shares, rental cars, and shuttles are available island-wide'],
      ],
      note: 'We will share more detailed transportation and parking information closer to the date.',
    },
  },
  {
    id: 'travel',
    left: {
      label: 'Travel',
      heading: 'Stay a little longer',
      body: [
        'If you are able, we hope you will turn our wedding weekend into a mini getaway.',
        'From snorkeling and surf lessons to sunset sails, Oʻahu has so much to explore.',
      ],
    },
    right: {
      label: 'Where to stay',
      listTitle: 'Accommodation Ideas',
      list: [
        ['Resorts', 'West Oʻahu resorts near Ko Olina & Kapolei'],
        ['City stays', 'Boutique hotels and resorts in Honolulu & Waikīkī'],
        ['Groups', 'Vacation rentals for families and friends traveling together'],
      ],
      note: 'We will share specific hotel suggestions and possible room blocks soon.',
    },
  },
  {
    id: 'rsvp',
    left: {
      label: 'RSVP',
      heading: 'We hope you can join us',
      body: [
        'Your presence means the world to us. Please let us know if you will be able to celebrate with us in Hawaiʻi.',
        'We kindly ask that you RSVP once you receive your formal invitation. Please RSVP by clicking on the link below.',
      ],
      linkUrl: 'https://www.zola.com/wedding/kevinandallysha2026/rsvp',
      linkLabel: 'RSVP on Zola',
    },
    right: {
      label: 'Contact',
      heading: 'Questions or special requests?',
      body: [
        'If you have any questions about travel, accommodations, or the celebration, please reach out anytime.',
        'We are happy to help make your trip as smooth and memorable as possible.',
      ],
      note: 'Contact details will be included on your formal invitation and RSVP card.',
    },
  },
  {
    id: 'closing',
    left: {
      label: 'Mahalo',
      heading: 'With love & gratitude',
      body: [
        'Thank you for being a part of our story and for considering a journey all the way to Hawaiʻi to celebrate with us.',
      ],
    },
    right: {
      heading: 'Allysha & Kevin',
      accent: 'We cannot wait to see you on September 18, 2026 at Wai Kai.',
    },
  },
]

function App() {
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [isTurning, setIsTurning] = useState(false)
  const [direction, setDirection] = useState('next')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  const totalSpreads = spreads.length

  const pageTabs = spreads.map((spread, index) => {
    const title =
      (spread.left && (spread.left.label || spread.left.heading)) ||
      (spread.right && (spread.right.label || spread.right.heading)) ||
      spread.id
    return { index, title }
  })

  const glossaryItems = spreads
    .map((spread, index) => {
      if (spread.id === 'glossary') return null
      const title =
        (spread.left && (spread.left.label || spread.left.heading)) ||
        (spread.right && (spread.right.label || spread.right.heading)) ||
        spread.id
      return { index, title }
    })
    .filter(Boolean)

  const goToSpread = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= totalSpreads || isTurning) return
    setIsMenuOpen(false)
    setDirection(nextIndex > spreadIndex ? 'next' : 'prev')
    setIsTurning(true)
    setSpreadIndex(nextIndex)
  }

  const goNext = () => goToSpread(spreadIndex + 1)
  const goPrev = () => goToSpread(spreadIndex - 1)

  useEffect(() => {
    if (!isTurning) return
    const timer = setTimeout(() => {
      setIsTurning(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [isTurning])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event) => {
      const menuEl = menuRef.current
      const toggleEl = toggleRef.current
      if (
        menuEl &&
        !menuEl.contains(event.target) &&
        toggleEl &&
        !toggleEl.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  const current = spreads[spreadIndex]
  const coverVideoIds =
    current.id === 'cover' && Array.isArray(current.right)
      ? current.right
          .map((item) => item.videoId)
          .filter(Boolean)
      : current.right && current.right.videoId
      ? [current.right.videoId]
      : []

  return (
    <div className="page-root">
      <div className="tropical-background">
        <div className="leaf leaf-1" />
        <div className="leaf leaf-2" />
        <div className="leaf leaf-3" />
      </div>

      <main className="book-shell">
        <header className="site-header">
          <div className="header-names">Allysha & Kevin</div>
          <div className="header-details">
            September 18, 2026 · Wai Kai · Oʻahu, Hawaiʻi
          </div>
        </header>

        <div className="page-tabs-shell">
          {/* Desktop navbar tabs */}
          <nav
            className={[
              'page-tabs',
              isMenuOpen ? 'page-tabs--open' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label="Page navigation tabs"
            ref={menuRef}
          >
            {pageTabs.map((tab) => (
              <button
                key={tab.index}
                type="button"
                className={[
                  'page-tab',
                  tab.index === spreadIndex ? 'page-tab--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => goToSpread(tab.index)}
                disabled={isTurning}
              >
                {tab.title}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger / shaka toggle */}
          <button
            type="button"
            className={[
              'page-tabs-toggle',
              isMenuOpen ? 'page-tabs-toggle--open' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close page menu' : 'Open page menu'}
            ref={toggleRef}
          >
            {isMenuOpen ? (
              <span className="page-tabs-toggle-shaka">🤙</span>
            ) : (
              <>
                <span className="page-tabs-toggle-line" />
                <span className="page-tabs-toggle-line" />
                <span className="page-tabs-toggle-line" />
              </>
            )}
          </button>
        </div>

        <section
          className={[
            'book',
            isTurning ? 'book--turning' : '',
            `book--${direction}`,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="book-spine" />

          {/* Left page */}
          <article className="book-page book-page--left">
            {current.left ? (
              <PageSide content={current.left} alignment="left" />
            ) : (
              <div className="page-cover">
                <p className="page-label">Our wedding story</p>
              </div>
            )}
          </article>

          {/* Right page */}
          <article className="book-page book-page--right">
            {current.id === 'glossary' && current.right && current.right.collage ? (
              <div className="page-inner page-inner--right">
                <img
                  src={collageImage}
                  alt="Photo collage of Allysha & Kevin"
                  className="collage-image"
                />
              </div>
            ) : current.id === 'cover' && coverVideoIds.length > 0 ? (
              <div className="page-inner page-inner--right">
                <div className="video-wrapper">
                  <iframe
                    className="video-frame"
                    src={`https://www.youtube.com/embed/${coverVideoIds[0]}?autoplay=1&loop=1&playlist=${coverVideoIds.join(
                      ','
                    )}`}
                    title="Our wedding video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : current.right && current.right.videoId ? (
              <div className="page-inner page-inner--right">
                <div className="video-wrapper">
                  <iframe
                    className="video-frame"
                    src={`https://www.youtube.com/embed/${current.right.videoId}?autoplay=1&loop=1&playlist=${current.right.videoId}`}
                    title="Our wedding video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : current.right ? (
              <PageSide content={current.right} alignment="right" />
            ) : null}
          </article>
        </section>

        <footer className="book-footer">
          <div className="footer-controls">
            <button
              type="button"
              onClick={goPrev}
              disabled={spreadIndex === 0 || isTurning}
              className="nav-button nav-button--prev"
            >
              ◀ Previous page
            </button>
            <div className="page-indicator">
              Page {spreadIndex + 1} of {totalSpreads}
            </div>
            <button
              type="button"
              onClick={goNext}
              disabled={spreadIndex === totalSpreads - 1 || isTurning}
              className="nav-button nav-button--next"
            >
              Next page ▶
            </button>
          </div>
          <div className="page-dots">
            {spreads.map((spread, index) => (
              <button
                key={spread.id}
                type="button"
                className={[
                  'page-dot',
                  index === spreadIndex ? 'page-dot--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => goToSpread(index)}
                disabled={isTurning}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
          <div className="footer-note">
            Turn the pages to explore the details of our tropical wedding at
            Wai Kai.
          </div>
        </footer>
      </main>
    </div>
  )
}

function PageSide({ content, alignment }) {
  const isStory = Boolean(content.storyTitle)

  return (
    <div className={`page-inner page-inner--${alignment}`}>
      {content.label && <p className="page-label">{content.label}</p>}
      {content.storyTitle && (
        <p className="story-title">{content.storyTitle}</p>
      )}
      {content.heading && <h2 className="page-heading">{content.heading}</h2>}
      {content.title && <h1 className="page-title">{content.title}</h1>}
      {content.subtitle && (
        <p className="page-subtitle">{content.subtitle}</p>
      )}
      {content.location && (
        <p className="page-location">{content.location}</p>
      )}
      {content.accent && <p className="page-accent">{content.accent}</p>}

      {Array.isArray(content.body) && (
        <div className={`page-body${isStory ? ' page-body--scroll' : ''}`}>
          {content.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {content.linkUrl && (
        <p className="page-link">
          <a href={content.linkUrl}>
            {content.linkLabel || content.linkUrl}
          </a>
        </p>
      )}

      {Array.isArray(content.timeline) && (
        <ul className="page-timeline">
          {content.timeline.map(([time, desc]) => (
            <li key={time}>
              <span className="timeline-time">{time}</span>
              <span className="timeline-desc">{desc}</span>
            </li>
          ))}
        </ul>
      )}

      {Array.isArray(content.list) && (
        <div className="page-list">
          {content.listTitle && (
            <h3 className="page-list-title">{content.listTitle}</h3>
          )}
          <dl>
            {content.list.map(([term, definition]) => (
              <div key={term} className="list-row">
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {content.note && <p className="page-note">{content.note}</p>}
    </div>
  )
}

export default App
