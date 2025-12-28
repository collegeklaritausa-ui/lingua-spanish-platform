import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Volume2,
  Info,
  Lightbulb,
  MessageSquare,
  Briefcase,
  Crown,
  Laugh
} from "lucide-react";

type LinguisticRegister = 'slang' | 'informal' | 'neutral' | 'formal' | 'diplomatic';

interface RegisterInfo {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

const registerInfo: Record<LinguisticRegister, RegisterInfo> = {
  slang: {
    name: 'Slang / Street',
    description: 'Casual street language, colloquialisms, and youth expressions',
    icon: <Laugh className="w-5 h-5" />,
    color: 'from-pink-500 to-rose-600',
    examples: ['¡Qué guay!', '¡Mola mucho!', '¡Está flipante!']
  },
  informal: {
    name: 'Informal',
    description: 'Casual everyday speech with friends and family',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'from-orange-500 to-amber-600',
    examples: ['¡Hola! ¿Qué tal?', '¿Quedamos luego?', 'Me parece bien']
  },
  neutral: {
    name: 'Neutral',
    description: 'Standard language suitable for most situations',
    icon: <Info className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-600',
    examples: ['Buenos días', 'Me gustaría saber...', 'Gracias por su ayuda']
  },
  formal: {
    name: 'Formal',
    description: 'Professional and business language',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'from-purple-500 to-violet-600',
    examples: ['Estimado/a señor/a', 'Le agradecería...', 'Atentamente']
  },
  diplomatic: {
    name: 'Diplomatic',
    description: 'Highly formal, ceremonial, and official language',
    icon: <Crown className="w-5 h-5" />,
    color: 'from-yellow-500 to-amber-600',
    examples: ['Excelentísimo/a', 'Tengo el honor de...', 'Con el debido respeto']
  }
};

// Mock conversion function (would call API in production)
const mockConversions: Record<string, Record<LinguisticRegister, string>> = {
  'hola que tal': {
    slang: '¡Ey, qué pasa tío! ¿Cómo andas?',
    informal: '¡Hola! ¿Qué tal? ¿Cómo estás?',
    neutral: 'Buenos días. ¿Cómo se encuentra usted?',
    formal: 'Estimado/a, espero que se encuentre bien.',
    diplomatic: 'Excelentísimo/a, es un honor dirigirme a usted. Confío en que goce de excelente salud.'
  },
  'quiero hablar contigo': {
    slang: '¡Eh, tío! Tenemos que hablar, ¿vale?',
    informal: 'Oye, ¿podemos hablar un momento?',
    neutral: 'Me gustaría hablar con usted cuando tenga un momento.',
    formal: 'Quisiera solicitar una reunión para tratar un asunto de importancia.',
    diplomatic: 'Tendría el honor de solicitar una audiencia con su excelencia para abordar un tema de suma relevancia.'
  },
  'no estoy de acuerdo': {
    slang: '¡Qué va! Ni de coña, tío.',
    informal: 'Pues yo no lo veo así, la verdad.',
    neutral: 'Respetuosamente, tengo una opinión diferente.',
    formal: 'Me permito expresar mi desacuerdo con la posición planteada.',
    diplomatic: 'Con el debido respeto y consideración, me veo en la obligación de manifestar una perspectiva alternativa sobre el asunto en cuestión.'
  }
};

export default function RegisterConverter() {
  const [inputText, setInputText] = useState('');
  const [fromRegister, setFromRegister] = useState<LinguisticRegister>('informal');
  const [toRegister, setToRegister] = useState<LinguisticRegister>('formal');
  const [outputText, setOutputText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    
    setIsConverting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check for mock conversions or generate a placeholder
    const normalizedInput = inputText.toLowerCase().trim();
    const mockResult = mockConversions[normalizedInput];
    
    if (mockResult && mockResult[toRegister]) {
      setOutputText(mockResult[toRegister]);
    } else {
      // Generate a placeholder response
      const prefixes: Record<LinguisticRegister, string> = {
        slang: '¡Eh, tío! ',
        informal: 'Oye, ',
        neutral: '',
        formal: 'Estimado/a, ',
        diplomatic: 'Excelentísimo/a, '
      };
      setOutputText(`${prefixes[toRegister]}[Converted from ${fromRegister} to ${toRegister}]: ${inputText}`);
    }
    
    setIsConverting(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    const temp = fromRegister;
    setFromRegister(toRegister);
    setToRegister(temp);
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          Linguistic Register Converter
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform Spanish text between different linguistic registers - from casual slang to diplomatic formality.
          Perfect for learning how to adapt your language to different social contexts.
        </p>
      </div>

      {/* Register Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {(Object.keys(registerInfo) as LinguisticRegister[]).map((register) => {
          const info = registerInfo[register];
          const isSelected = register === fromRegister || register === toRegister;
          
          return (
            <Card 
              key={register}
              className={`
                cursor-pointer transition-all
                ${isSelected ? `bg-gradient-to-br ${info.color} border-0` : 'bg-white/5 border-white/10 hover:bg-white/10'}
              `}
              onClick={() => {
                if (register !== toRegister) setFromRegister(register);
              }}
            >
              <CardContent className="p-3 text-center">
                <div className={`mx-auto mb-1 ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                  {info.icon}
                </div>
                <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {info.name}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Converter Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">From</CardTitle>
              <Select value={fromRegister} onValueChange={(v) => setFromRegister(v as LinguisticRegister)}>
                <SelectTrigger className={`w-40 bg-gradient-to-r ${registerInfo[fromRegister].color} border-0 text-white`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(registerInfo) as LinguisticRegister[]).map((register) => (
                    <SelectItem key={register} value={register} disabled={register === toRegister}>
                      {registerInfo[register].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription className="text-gray-400">
              {registerInfo[fromRegister].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter Spanish text to convert..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-gray-500 text-xs">Try:</span>
              {registerInfo[fromRegister].examples.map((example, idx) => (
                <Badge 
                  key={idx}
                  variant="outline" 
                  className="text-gray-400 border-gray-600 cursor-pointer hover:bg-white/10"
                  onClick={() => setInputText(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">To</CardTitle>
              <Select value={toRegister} onValueChange={(v) => setToRegister(v as LinguisticRegister)}>
                <SelectTrigger className={`w-40 bg-gradient-to-r ${registerInfo[toRegister].color} border-0 text-white`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(registerInfo) as LinguisticRegister[]).map((register) => (
                    <SelectItem key={register} value={register} disabled={register === fromRegister}>
                      {registerInfo[register].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription className="text-gray-400">
              {registerInfo[toRegister].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-32 p-3 rounded-md bg-white/10 border border-white/20 text-white">
              {isConverting ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
                  <span className="ml-2 text-gray-400">Converting...</span>
                </div>
              ) : outputText ? (
                <p>{outputText}</p>
              ) : (
                <p className="text-gray-500">Converted text will appear here...</p>
              )}
            </div>
            {outputText && (
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={handleSwap}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Swap
        </Button>
        <Button
          onClick={handleConvert}
          disabled={!inputText.trim() || isConverting}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
        >
          {isConverting ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Convert
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 mt-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Learning Tip</h3>
              <p className="text-gray-300 mb-3">
                Understanding linguistic registers is crucial for effective communication in Spanish. 
                The same message can have very different impacts depending on how formally it's expressed.
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• <strong className="text-purple-400">Slang</strong>: Use with close friends, in casual settings</li>
                <li>• <strong className="text-orange-400">Informal</strong>: Everyday conversations with acquaintances</li>
                <li>• <strong className="text-blue-400">Neutral</strong>: Safe for most professional and social situations</li>
                <li>• <strong className="text-violet-400">Formal</strong>: Business emails, official documents, interviews</li>
                <li>• <strong className="text-yellow-400">Diplomatic</strong>: Government, royalty, ceremonial occasions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
