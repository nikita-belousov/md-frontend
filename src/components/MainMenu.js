import React, { Component } from 'react'
import uuid from 'small-uuid'
import styles from './../styles/components/MainMenu.css'
import Container from './Container'
import Popup from './Popup'
import Button from './common/Button'

const menuData = [
  {
    'mainTitle': 'Имплантация',
    'mainPath': '#',
    'btnTitle': 'Цены на имплантацию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      },
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Ортопедия',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Ортодонтия',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Терапевтия',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Эстетика',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Хирургия',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Гигиена',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Детская стоматология',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  },
  {
    'mainTitle': 'Ортопедия',
    'mainPath': '#',
    'btnTitle': 'Цены на ортопедию',
    'btnPath': '#',
    'subLinks': [
      {
        'title': 'Одномоментная и отсроченая',
        'path': '#'
      },
      {
        'title': 'При полном отсутствии зубов',
        'path': '#'
      },
      {
        'title': 'Эстетическая',
        'path': '#'
      },
      {
        'title': 'Синус-лифтинг и костная пластика',
        'path': '#'
      },
      {
        'title': 'Пластика мягких тканей',
        'path': '#'
      }
    ]
  }
]

export default class MainMenu extends Component {
  state = {
    activeItem: null
  }

  handleItemClick(e, i) {
    e.nativeEvent.stopImmediatePropagation()

    this.setState(prevState => ({
      activeItem: i
    }))
  }

  resetActiveItem = () => {
    this.setState({
      activeItem: null
    })
  }

  renderPopupButton = (text) => {
    return (
      <Button type='popup'>
        {text}
      </Button>
    )
  }

  renderDropdown(item) {
    return (
      <div className={styles['dropdown-wrapper']}>
        <Popup
          renderButton={() => this.renderPopupButton(item['btnTitle'])}
          onClose={this.resetActiveItem}
        >
          <ul className={styles['dropdown']}>
            <li>
              <a
                href={item['mainPath']}
                className={styles['main']}
              >
                {item['mainTitle']}
              </a>
            </li>
            {item['subLinks'].map(subLink =>
              <li key={uuid.create()}>
                <a
                  href={subLink['path']}
                  className={styles['sub-link']}
                >
                  {subLink['title']}
                </a>
              </li>
            )}
          </ul>
        </Popup>
      </div>
    )
  }

  renderItem(item, i) {
    const isActive = this.state.activeItem === i

    return (
      <li key={uuid.create()}>
        <span
          className={
            isActive
              ? styles['nav-link--active']
              : styles['nav-link']
          }
          onClick={(e) => this.handleItemClick(e, i)}
        >
          {item['mainTitle']}
        </span>

        {this.state.activeItem === i && this.renderDropdown(item)}
      </li>
    )
  }

  render() {
    return (
      <div className={styles['wrapper']}>
        <div className={styles['bg']}>
          <Container>
            <ul className={styles['navigation']}>
              {menuData.map((item, i) => this.renderItem(item, i))}
            </ul>
          </Container>
        </div>
      </div>
    )
  }
}
