import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is the Vinit Abhedya Foundation?",
        answer:
            "The Vinit Abhedya Foundation is a grassroots initiative based in Chhatrapati Sambhajinagar focused on environmental sustainability, community development, and social awareness."
    },
    {
        question: "What kind of initiatives does the foundation run?",
        answer:
            "Our initiatives include environmental clean-up drives, tree plantation campaigns, educational outreach programs, and awareness workshops focused on sustainable community development."
    },
    {
        question: "How can I volunteer?",
        answer:
            "Anyone passionate about community impact can volunteer in our drives, campaigns, and outreach initiatives."
    },
    {
        question: "Where are your initiatives conducted?",
        answer:
            "Most initiatives currently take place in and around Chhatrapati Sambhajinagar, Maharashtra."
    },
    {
        question: "How can organizations collaborate with you?",
        answer:
            "We collaborate with schools, colleges, NGOs, and local organizations to host drives and sponsor initiatives."
    },
    {
        question: "How can I stay updated?",
        answer:
            "You can follow our social media channels or subscribe to our newsletter."
    }
];

export default function FAQ() {

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (

        <section id="faq" className="bg-white text-black py-24">

            <div className="max-w-4xl mx-auto px-6">

                <h2 className="text-4xl font-semibold mb-4 text-center">
                    Frequently Asked Questions
                </h2>

                <p className="text-gray-500 text-center mb-14">
                    Everything you need to know about our mission, initiatives, and how you can get involved.
                </p>

                <div className="space-y-4">

                    {faqs.map((faq, index) => {

                        const isOpen = openIndex === index;

                        return (

                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl overflow-hidden"
                            >

                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex justify-between items-center px-6 py-5 text-left"
                                >

                                    <span className="font-medium">
                                        {faq.question}
                                    </span>

                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>

                                </button>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isOpen ? "auto" : 0,
                                        opacity: isOpen ? 1 : 0
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }}
                                    className="overflow-hidden"
                                >

                                    <div className="px-6 pb-6 text-gray-600 text-sm">
                                        {faq.answer}
                                    </div>

                                </motion.div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );
}