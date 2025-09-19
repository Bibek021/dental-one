// Demo page to showcase all components

import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Checkbox, RadioGroup } from '../components/ui/Checkbox';
import { Select } from '../components/ui/Select';
import { AnimatedScroll } from '../components/ui/ScrollTrigger';
import { useThemeToggle } from '../contexts/ThemeContext';

export function ComponentDemo() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useThemeToggle();

  const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4', disabled: true },
  ];

  const radioOptions = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
  ];

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedScroll animation="fadeIn">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Component Demo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Showcase of all reusable UI components - Theme: {isDark ? 'Dark' : 'Light'}
            </p>
          </div>
        </AnimatedScroll>

        <div className="space-y-12">
          {/* Buttons Section */}
          <AnimatedScroll animation="slideUp">
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Buttons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Variants</h3>
                  <div className="space-y-3">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="danger">Danger Button</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Sizes & States</h3>
                  <div className="space-y-3">
                    <Button size="sm">Small Button</Button>
                    <Button size="md">Medium Button</Button>
                    <Button size="lg">Large Button</Button>
                    <Button isLoading={isLoading} onClick={handleLoadingDemo}>
                      {isLoading ? 'Loading...' : 'Click for Loading Demo'}
                    </Button>
                    <Button disabled>Disabled Button</Button>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedScroll>

          {/* Form Components Section */}
          <AnimatedScroll animation="slideUp">
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Form Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Text Input"
                    placeholder="Enter your name"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    helperText="This is a helper text"
                  />
                  
                  <Input
                    label="Email Input"
                    type="email"
                    placeholder="Enter your email"
                    error="This email is already taken"
                    required
                  />
                  
                  <Input
                    label="Input with Icons"
                    placeholder="Search..."
                    leftIcon="🔍"
                    rightIcon="⚙️"
                  />
                  
                  <Textarea
                    label="Textarea"
                    placeholder="Enter your message"
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-4">
                  <Select
                    label="Basic Select"
                    options={selectOptions}
                    value={selectValue}
                    onChange={(value) => setSelectValue(String(value))}
                    placeholder="Choose an option"
                  />
                  
                  <Select
                    label="Searchable Select"
                    options={selectOptions}
                    value={selectValue}
                    onChange={(value) => setSelectValue(String(value))}
                    searchable
                    placeholder="Search and select"
                  />
                  
                  <Checkbox
                    label="Accept terms and conditions"
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                  
                  <RadioGroup
                    label="Choose an option"
                    name="demo-radio"
                    options={radioOptions}
                    value={radioValue}
                    onChange={setRadioValue}
                  />
                </div>
              </div>
            </section>
          </AnimatedScroll>

          {/* Animation Demos Section */}
          <AnimatedScroll animation="slideUp">
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Animation Examples</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AnimatedScroll animation="fadeIn" triggerOnce={false}>
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100">Fade In</h3>
                  </div>
                </AnimatedScroll>
                
                <AnimatedScroll animation="slideUp" triggerOnce={false}>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
                    <h3 className="font-medium text-green-900 dark:text-green-100">Slide Up</h3>
                  </div>
                </AnimatedScroll>
                
                <AnimatedScroll animation="scaleIn" triggerOnce={false}>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">
                    <h3 className="font-medium text-purple-900 dark:text-purple-100">Scale In</h3>
                  </div>
                </AnimatedScroll>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                Scroll up and down to see animations trigger
              </p>
            </section>
          </AnimatedScroll>

          {/* Component Values Display */}
          <AnimatedScroll animation="slideUp">
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Current Values</h2>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {JSON.stringify({
                    inputValue,
                    textareaValue,
                    checkboxChecked,
                    radioValue,
                    selectValue,
                    isLoading,
                    theme: isDark ? 'dark' : 'light'
                  }, null, 2)}
                </pre>
              </div>
            </section>
          </AnimatedScroll>
        </div>
      </div>
    </div>
  );
}