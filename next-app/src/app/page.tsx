import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SectionRenderer from '@/components/sections/SectionRenderer'
import {getHomePage, getAllPosts} from '@/sanity/lib'
import Card from '@/components/ui/Card'

export default async function HomePage() {
  const [page, posts] = await Promise.all([getHomePage(), getAllPosts()])

  // If Sanity has page content configured, render dynamic sections
  if (page?.sections?.length) {
    return <SectionRenderer sections={page.sections} />
  }

  // Fallback: static template content until CMS is configured
  const recentPosts = posts.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-900 via-primary-700 to-navy-800">
        <Container className="relative z-10 py-20">
          <div className="max-w-2xl text-white">
            <p className="text-secondary-400 font-medium mb-2">Welcome to</p>
            <h1 className="!text-white text-4xl sm:text-5xl lg:text-6xl mb-4">{'{{PROJECT_NAME}}'}</h1>
            <p className="text-lg text-neutral-200 mb-8">
              Your project description goes here. Edit this page or configure content in Sanity Studio.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/blog" size="lg">View Blog</Button>
              <Button href="/nosotros" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white/10">
                About Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-20">
        <Container className="max-w-3xl text-center">
          <h2>Welcome</h2>
          <p className="text-lg text-neutral-600">
            This is a starter template built with Next.js, Sanity CMS, Tailwind CSS, and AWS Amplify.
            Configure your content in Sanity Studio to replace this placeholder text.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button href="/contacto" variant="secondary">Contact</Button>
            <Button href="/nosotros" variant="outline">About</Button>
          </div>
        </Container>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-center mb-10">Recent Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map(post => (
                <Card
                  key={post._id}
                  title={post.title}
                  description={post.excerpt}
                  image={post.mainImage}
                  href={`/blog/${post.slug.current}`}
                  date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US') : undefined}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button href="/blog" variant="outline">View All Posts</Button>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-secondary-500 text-white">
        <Container className="text-center max-w-2xl">
          <h2 className="!text-white">Get Started</h2>
          <p className="text-lg opacity-90 mb-8">
            Ready to build something amazing? Start by configuring your Sanity Studio content.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/programacion" variant="primary" size="lg">Schedule</Button>
            <Button href="/contacto" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white/10">
              Contact
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
