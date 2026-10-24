import ArticleSection from '../components/Article'
import TutorialSection from '../components/Tutorial'
import Newsletter from '../components/Newsletter'

export default function Home() {
  return (
    <>
      <h1>DEV@Deakin</h1>
      <Newsletter />
      <ArticleSection />
      <TutorialSection />
    </>
  )
}
