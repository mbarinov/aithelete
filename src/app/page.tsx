import { Button } from "@/components/ui/button";
import { Brain, Barbell, Lightning, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <CTASection />
        </>
    );
}

function HeroSection() {
    return (
        <section className="px-4 py-20 text-center relative bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text">
                Your AI Personal Trainer 🏋️‍♂️🤖
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Personalized split training programs that are smart, effective, and tailored just for you!
            </p>
            <div>
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-200">
                    <Link href="/login">
                        Start Your Fitness Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}

function FeaturesSection() {
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Personalization",
            description: "Our AI crafts the perfect workout plan based on your unique profile."
        },
        {
            icon: Barbell,
            title: "Adaptive Training",
            description: "Programs that evolve with you, ensuring continuous progress."
        },
        {
            icon: Lightning,
            title: "Efficiency Boost",
            description: "Achieve your fitness goals faster with optimized workout plans."
        }
    ];

    return (
        <section id="features" className="container mx-auto px-4 py-20 relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose AIthelete? 🚀
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
}

interface FeatureCardProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
    );
}

function HowItWorksSection() {
    const steps = [
        "Sign up and create your profile with age, fitness level, height, and weight.",
        "Our AI analyzes your data and generates a personalized training program.",
        "Follow your custom workouts and track your progress in the app.",
    ];

    return (
        <section id="how-it-works" className="container mx-auto px-4 py-20 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works 💡</h2>
            <div className="max-w-3xl mx-auto space-y-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {index + 1}
                        </div>
                        <p className="text-lg text-gray-800 dark:text-gray-200">{step}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="px-4 py-20 text-center relative bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20%22%3E%3Ccircle cx=%222%22 cy=%222%22 r=%222%22 fill=%22%23e5e7eb%22/%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20%22%3E%3Ccircle cx=%222%22 cy=%222%22 r=%222%22 fill=%22%2333343d%22/%3E%3C/svg%3E')]"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Fitness Journey? 🚀
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join AIthelete today and experience the power of AI-driven personalized training.
            </p>
            <div>
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-200">
                    <Link href="/signup">
                        Get Started Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}