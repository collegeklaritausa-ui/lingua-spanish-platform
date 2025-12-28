/**
 * Prize2Pride Lingua Spanish Platform
 * Lesson Formatter Component - Beautiful Multi-colored Text Display
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Features:
 * - Multi-colored formatting for different content types
 * - Bold for important words
 * - Highlighted stressed syllables
 * - Line breaks after expressions
 * - Optimal spacing for comfortable reading
 * - Support for all language modes
 */

import React from 'react';

// Color palette based on Prize2Pride luxury theme
export const LESSON_COLORS = {
  // Primary content colors
  spanish: '#FBBF24',        // Gold - Spanish words
  translation: '#60A5FA',    // Blue - Translations
  pronunciation: '#F97316',  // Orange - Pronunciation guides
  stressed: '#EF4444',       // Red - Stressed syllables
  
  // Section colors
  vocabulary: '#34D399',     // Green - Vocabulary sections
  grammar: '#A78BFA',        // Purple - Grammar explanations
  cultural: '#F472B6',       // Pink - Cultural notes
  example: '#22D3EE',        // Cyan - Examples
  important: '#FCD34D',      // Bright Gold - Important notes
  warning: '#F87171',        // Light Red - Warnings
  
  // Text colors
  normal: '#E5E7EB',         // Light gray - Normal text
  muted: '#9CA3AF',          // Muted gray - Secondary text
  highlight: '#FFFFFF',      // White - Highlighted text
  
  // Background colors
  bgSpanish: 'rgba(251, 191, 36, 0.15)',
  bgStressed: 'rgba(249, 115, 22, 0.2)',
  bgImportant: 'rgba(252, 211, 77, 0.1)',
  bgExample: 'rgba(34, 211, 238, 0.1)',
};

// Types for formatted content
export interface FormattedSegment {
  text: string;
  type: 'normal' | 'spanish' | 'translation' | 'pronunciation' | 'stressed' | 
        'vocabulary' | 'grammar' | 'cultural' | 'example' | 'important' | 'warning' |
        'heading' | 'subheading' | 'bullet' | 'emoji';
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  newLine?: boolean;
  spacingAfter?: 'none' | 'small' | 'medium' | 'large';
}

export interface FormattedLesson {
  segments: FormattedSegment[];
}

// Parse raw lesson text into formatted segments
export function parseLessonContent(rawText: string): FormattedSegment[] {
  const segments: FormattedSegment[] = [];
  const lines = rawText.split('\n');
  
  lines.forEach((line, lineIndex) => {
    const trimmedLine = line.trim();
    
    // Empty line - add spacing
    if (!trimmedLine) {
      segments.push({ text: '', type: 'normal', newLine: true, spacingAfter: 'medium' });
      return;
    }
    
    // Section headers with emojis
    if (trimmedLine.match(/^(📚|🎯|💡|🌍|📖|⚠️|✨|🔥|👑)/)) {
      const emoji = trimmedLine.match(/^(📚|🎯|💡|🌍|📖|⚠️|✨|🔥|👑)/)?.[0] || '';
      const headerText = trimmedLine.slice(emoji.length).trim();
      
      segments.push({ text: emoji + ' ', type: 'emoji', bold: true });
      
      // Determine header type
      if (headerText.includes('VOCABULARIO') || headerText.includes('VOCABULARY')) {
        segments.push({ text: headerText, type: 'vocabulary', bold: true, newLine: true, spacingAfter: 'medium' });
      } else if (headerText.includes('IMPORTANTE') || headerText.includes('IMPORTANT')) {
        segments.push({ text: headerText, type: 'important', bold: true, newLine: true, spacingAfter: 'medium' });
      } else if (headerText.includes('EJEMPLO') || headerText.includes('EXAMPLE')) {
        segments.push({ text: headerText, type: 'example', bold: true, newLine: true, spacingAfter: 'small' });
      } else if (headerText.includes('GRAMÁTICA') || headerText.includes('GRAMMAR')) {
        segments.push({ text: headerText, type: 'grammar', bold: true, newLine: true, spacingAfter: 'medium' });
      } else if (headerText.includes('CULTURAL') || headerText.includes('CULTURA')) {
        segments.push({ text: headerText, type: 'cultural', bold: true, newLine: true, spacingAfter: 'small' });
      } else if (headerText.includes('ADVERTENCIA') || headerText.includes('WARNING')) {
        segments.push({ text: headerText, type: 'warning', bold: true, newLine: true, spacingAfter: 'small' });
      } else {
        segments.push({ text: headerText, type: 'heading', bold: true, newLine: true, spacingAfter: 'medium' });
      }
      return;
    }
    
    // Bullet points
    if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
      const bulletContent = trimmedLine.slice(1).trim();
      segments.push({ text: '  • ', type: 'normal' });
      parseInlineFormatting(bulletContent, segments);
      segments.push({ text: '', type: 'normal', newLine: true, spacingAfter: 'small' });
      return;
    }
    
    // Dialogue lines (starting with —)
    if (trimmedLine.startsWith('—') || trimmedLine.startsWith('-')) {
      segments.push({ text: '— ', type: 'spanish', bold: true });
      const dialogueContent = trimmedLine.slice(1).trim();
      parseInlineFormatting(dialogueContent, segments);
      segments.push({ text: '', type: 'normal', newLine: true, spacingAfter: 'small' });
      return;
    }
    
    // Translation lines (containing → or =)
    if (trimmedLine.includes('→') || (trimmedLine.includes('=') && !trimmedLine.includes('=='))) {
      const separator = trimmedLine.includes('→') ? '→' : '=';
      const parts = trimmedLine.split(separator);
      
      if (parts.length >= 2) {
        // Spanish part
        parseInlineFormatting(parts[0].trim(), segments, 'spanish');
        segments.push({ text: ` ${separator} `, type: 'normal' });
        // Translation part
        parseInlineFormatting(parts[1].trim(), segments, 'translation');
        segments.push({ text: '', type: 'normal', newLine: true, spacingAfter: 'small' });
        return;
      }
    }
    
    // Pronunciation lines
    if (trimmedLine.toLowerCase().startsWith('pronunciación:') || trimmedLine.toLowerCase().startsWith('pronunciation:')) {
      const pronContent = trimmedLine.split(':')[1]?.trim() || '';
      segments.push({ text: 'Pronunciación: ', type: 'muted' as any, italic: true });
      parsePronunciation(pronContent, segments);
      segments.push({ text: '', type: 'normal', newLine: true, spacingAfter: 'medium' });
      return;
    }
    
    // Regular line - parse inline formatting
    parseInlineFormatting(trimmedLine, segments);
    segments.push({ text: '', type: 'normal', newLine: true, spacingAfter: 'small' });
  });
  
  return segments;
}

// Parse inline formatting (bold, stressed syllables, etc.)
function parseInlineFormatting(
  text: string, 
  segments: FormattedSegment[], 
  defaultType: FormattedSegment['type'] = 'normal'
) {
  // Pattern for **bold**, [stressed], and regular text
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]|[^*\[\]]+)/g;
  const matches = text.match(pattern) || [text];
  
  matches.forEach((match) => {
    if (match.startsWith('**') && match.endsWith('**')) {
      // Bold text
      segments.push({ 
        text: match.slice(2, -2), 
        type: defaultType === 'normal' ? 'spanish' : defaultType, 
        bold: true 
      });
    } else if (match.startsWith('[') && match.endsWith(']')) {
      // Stressed syllable
      segments.push({ 
        text: match.slice(1, -1), 
        type: 'stressed', 
        bold: true,
        underline: true
      });
    } else if (match.trim()) {
      segments.push({ text: match, type: defaultType });
    }
  });
}

// Parse pronunciation with stressed syllables highlighted
function parsePronunciation(text: string, segments: FormattedSegment[]) {
  // Pattern for [STRESSED] syllables in pronunciation
  const pattern = /(\[[^\]]+\]|[^\[\]]+)/g;
  const matches = text.match(pattern) || [text];
  
  matches.forEach((match) => {
    if (match.startsWith('[') && match.endsWith(']')) {
      segments.push({ 
        text: match.slice(1, -1), 
        type: 'stressed', 
        bold: true 
      });
    } else if (match.trim()) {
      segments.push({ text: match, type: 'pronunciation' });
    }
  });
}

// Component to render formatted segments
interface LessonFormatterProps {
  content: string | FormattedSegment[];
  className?: string;
}

export const LessonFormatter: React.FC<LessonFormatterProps> = ({ content, className = '' }) => {
  const segments = typeof content === 'string' ? parseLessonContent(content) : content;
  
  return (
    <div className={`lesson-formatted leading-loose ${className}`}>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span
            style={{
              color: getColorForType(segment.type),
              fontWeight: segment.bold ? 'bold' : 'normal',
              fontStyle: segment.italic ? 'italic' : 'normal',
              textDecoration: segment.underline ? 'underline' : 'none',
              backgroundColor: getBackgroundForType(segment.type),
              padding: segment.type === 'stressed' ? '2px 6px' : '0',
              borderRadius: segment.type === 'stressed' ? '4px' : '0',
              fontSize: segment.type === 'heading' ? '1.2em' : 
                       segment.type === 'subheading' ? '1.1em' : '1em',
            }}
          >
            {segment.text}
          </span>
          {segment.newLine && <br />}
          {segment.spacingAfter === 'small' && <span className="block h-1" />}
          {segment.spacingAfter === 'medium' && <span className="block h-3" />}
          {segment.spacingAfter === 'large' && <span className="block h-5" />}
        </React.Fragment>
      ))}
    </div>
  );
};

// Helper function to get color for segment type
function getColorForType(type: FormattedSegment['type']): string {
  const colorMap: Record<string, string> = {
    normal: LESSON_COLORS.normal,
    spanish: LESSON_COLORS.spanish,
    translation: LESSON_COLORS.translation,
    pronunciation: LESSON_COLORS.pronunciation,
    stressed: LESSON_COLORS.stressed,
    vocabulary: LESSON_COLORS.vocabulary,
    grammar: LESSON_COLORS.grammar,
    cultural: LESSON_COLORS.cultural,
    example: LESSON_COLORS.example,
    important: LESSON_COLORS.important,
    warning: LESSON_COLORS.warning,
    heading: LESSON_COLORS.spanish,
    subheading: LESSON_COLORS.highlight,
    bullet: LESSON_COLORS.normal,
    emoji: LESSON_COLORS.highlight,
  };
  return colorMap[type] || LESSON_COLORS.normal;
}

// Helper function to get background for segment type
function getBackgroundForType(type: FormattedSegment['type']): string {
  if (type === 'stressed') return LESSON_COLORS.bgStressed;
  if (type === 'important') return LESSON_COLORS.bgImportant;
  if (type === 'example') return LESSON_COLORS.bgExample;
  return 'transparent';
}

// Pre-formatted lesson card component
interface LessonCardProps {
  title: string;
  content: string;
  mode: string;
  level: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  content,
  mode,
  level,
  onNext,
  onPrevious
}) => {
  const modeColors: Record<string, string> = {
    formal: '#1E40AF',
    informal: '#059669',
    slang: '#DC2626',
    dirty: '#7C3AED',
    expert: '#0891B2',
  };
  
  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-xl"
      style={{ 
        background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))',
        border: `2px solid ${modeColors[mode] || modeColors.formal}40`
      }}
    >
      {/* Header */}
      <div 
        className="px-6 py-4 border-b"
        style={{ 
          borderColor: `${modeColors[mode] || modeColors.formal}30`,
          background: `linear-gradient(90deg, ${modeColors[mode] || modeColors.formal}20, transparent)`
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="flex gap-2">
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: modeColors[mode] || modeColors.formal }}
            >
              {mode.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-black">
              {level}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 py-6">
        <LessonFormatter content={content} />
      </div>
      
      {/* Navigation */}
      {(onPrevious || onNext) && (
        <div className="px-6 py-4 border-t border-gray-700 flex justify-between">
          {onPrevious ? (
            <button
              onClick={onPrevious}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
            >
              ← Anterior
            </button>
          ) : <div />}
          
          {onNext && (
            <button
              onClick={onNext}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-bold transition-colors"
            >
              Siguiente →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonFormatter;
