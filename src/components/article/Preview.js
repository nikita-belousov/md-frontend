import { Link } from './../common'
import { PreviewPicture } from './'

const Preview = ({
  api,
  url,
  previewPicture,
  heading,
  datePublished,
  text,
  truncate
}) => {
  const thumbnail = previewPicture
    ? require(`./../../assets/images/news/${previewPicture}`)
    : undefined

  return (
    <div className={styles['article-entity']}>
      <div className={styles['columns']}>
        <div className={styles['side']}>
          <Link href={`/${api}/${url}`}>
            <PreviewPicture url={thumbnail} />
          </Link>
        </div>
        <div className={styles['article-content']}>
          <div className={styles['headline-link']}>
            <Link href={`/article/${url}`}>
              {heading}
            </Link>
          </div>
          <div className={styles['date']}>
            {utils.formatDate(datePublished)}
          </div>
          <Paragraph>
            {_.truncate(text, {
              length: truncate,
              separator: /,? +/
            })}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

Preview.defaultProps = {
  truncate: 250
}

export default Preview
