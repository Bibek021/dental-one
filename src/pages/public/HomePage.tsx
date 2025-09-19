// HomePage component with hero, features, and pricing sections

import { Button } from '../../components/ui/Button';
import { AnimatedScroll, StaggeredAnimation } from '../../components/ui/ScrollTrigger';
import { subscriptionPlans } from '../../data/clinics';
import { formatCurrency } from '../../utils';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <AnimatedScroll animation="fadeIn">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your
              <span className="text-blue-600 dark:text-blue-400"> Dental Practice</span>
            </h1>
          </AnimatedScroll>
          
          <AnimatedScroll animation="slideUp" delay={200}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Streamline your dental clinic operations with our comprehensive SaaS platform. 
              Manage patients, appointments, treatments, and billing all in one place.
            </p>
          </AnimatedScroll>
          
          <AnimatedScroll animation="slideUp" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-4">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </AnimatedScroll>
          
          <AnimatedScroll animation="slideUp" delay={600}>
            <div className="mt-16 relative">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Product Demo</p>
                    <p className="text-sm opacity-75">See DentalOne in action</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedScroll>
        </div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      title: 'Patient Management',
      description: 'Comprehensive patient records, medical history, and treatment planning in one secure location.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Smart Scheduling',
      description: 'Intelligent appointment scheduling with automated reminders and online booking capabilities.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Treatment Tracking',
      description: 'Track treatment progress, maintain detailed records, and generate comprehensive reports.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: 'Billing & Insurance',
      description: 'Streamlined billing processes with insurance claim management and payment tracking.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Analytics Dashboard',
      description: 'Powerful analytics and reporting tools to track practice performance and growth.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Multi-Location Support',
      description: 'Manage multiple clinic locations with centralized control and reporting.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedScroll animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to run your dental practice
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage patients, 
              appointments, treatments, and grow your practice.
            </p>
          </div>
        </AnimatedScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StaggeredAnimation staggerDelay={150}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </div>
    </section>
  );
}

// Pricing Section Component
function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedScroll animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your practice. All plans include our core features 
              with no hidden fees.
            </p>
          </div>
        </AnimatedScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StaggeredAnimation staggerDelay={200}>
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 p-6 ${
                  plan.isPopular
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.interval}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  fullWidth
                  size="lg"
                >
                  Start {plan.name} Plan
                </Button>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedScroll animation="fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to transform your dental practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of dental professionals who trust DentalOne to manage their practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </AnimatedScroll>
      </div>
    </section>
  );
}