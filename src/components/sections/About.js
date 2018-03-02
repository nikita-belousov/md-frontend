import React from 'react'
import styles from './../../styles/components/sections/About.css'
import Container from './../Container'
import Paragraph from './../common/Paragraph'
import PositionLabel from './../common/PositionLabel'

const About = (props) => (
  <div className={styles['wrapper']}>
    <div className={styles['bg']}>
      <Container>
        <div className={styles['inner']}>
          <div className={styles['about-us']}>
            <div className={styles['p-heading']}>
              <h2>О стоматологии «Мед-Дент»</h2>
            </div>
            <div className={styles['p-wrapper']}>
              <div className={styles['p-background']}>
                <div className={styles['p-inner']}>
                  <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas totam, atque, molestias voluptas dolor architecto nemo natus sint accusamus provident nesciunt! Nemo, quos, fuga. Impedit nostrum, blanditiis ex numquam fugiat voluptatibus dolorum minus doloribus sequi ducimus sit omnis eum, provident rem natus sunt optio aliquid doloremque, molestiae explicabo vel illo eos maxime cumque! Commodi doloribus illo modi natus laudantium voluptatem reprehenderit, et perferendis quidem. Fugiat consequatur natus laudantium suscipit molestias, officia, eaque facilis. Veniam harum corrupti saepe voluptate cum ut a nesciunt aspernatur consequuntur omnis, molestiae ex excepturi iure voluptas similique distinctio, accusantium inventore ea dolor tempora, beatae. Cum consectetur distinctio laudantium minima voluptates, quasi vitae, excepturi perferendis labore voluptatum, eius minus est autem in optio, hic ab natus! Magni quas accusantium officia fugit in. Voluptatibus amet facilis nesciunt, accusamus consequuntur dolorem saepe, quod dolores enim suscipit perspiciatis sequi similique vero totam a sed illo earum deserunt labore. Facilis aliquam accusamus quo aliquid, aperiam accusantium iusto. Ducimus neque eveniet voluptatibus, saepe et cumque quas deserunt error maxime ad numquam recusandae, ea tenetur non beatae temporibus nihil nesciunt aspernatur culpa id minima praesentium similique. In non nesciunt, consectetur obcaecati repellendus iste. Magnam ex aspernatur veritatis, optio culpa voluptate temporibus laboriosam minima!
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['head-doctor']}>
            <div className={styles['label']}>
              <div className={styles['name']}>
                <h4>Юров Руслан Викторович</h4>
              </div>
                <PositionLabel>
                  главный врач
                </PositionLabel>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </div>
)

export default About
