import styles from './../styles/components/ArticlePreviewPicture.css'

const ArticlePreviewPicture = ({ url }) => (
  <div
    style={{ backgroundImage: url ? `url(${url})` : null }}
    className={styles['preview-picture']}
  />
)

export default ArticlePreviewPicture
