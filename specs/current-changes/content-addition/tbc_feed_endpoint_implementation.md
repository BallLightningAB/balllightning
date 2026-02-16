// Example: BL homepage section
import { fetchBuilderCoilFeed } from '@/lib/builder-coil/feed';

export default async function HomePage() {
  const feed = await fetchBuilderCoilFeed();
  const items = feed?.items.slice(0, 5) ?? []; // Show latest 5

  return (
    <section>
      <h2>Latest from The Builder Coil</h2>
      <div className="grid">
        {items.map((item) => (
          <a 
            key={item.slug}
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card"
          >
            {item.image && (
              <img src={item.image.url} alt={item.image.alt} />
            )}
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
            <time>{new Date(item.publishedAt).toLocaleDateString()}</time>
          </a>
        ))}
      </div>
    </section>
  );
}