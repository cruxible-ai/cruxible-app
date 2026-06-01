export function DemoVideo() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            See it in action
          </h2>
          <p className="text-muted-foreground font-light">
            Watch how merchants measure true margin impact in under 3 minutes
          </p>
        </div>

        {/* Video embed */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '53.125%' }}>
            <iframe
              src="https://www.loom.com/embed/2a5e3e090f384f69ac65af0199210463"
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
