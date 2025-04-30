import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ScrollArrowButtonsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  buttonClassName?: string;
  iconSize?: number;
  ariaLabelLeft?: string;
  ariaLabelRight?: string;
}

/**
 * Componente reutilizável para botões de navegação esquerda/direita em listas scrolláveis
 */
export const ScrollArrowButtons = ({
  onScrollLeft,
  onScrollRight,
  showLeftArrow,
  showRightArrow,
  className = '',
  leftIcon,
  rightIcon,
  buttonClassName = '',
  iconSize = 24,
  ariaLabelLeft = 'Rolar para a esquerda',
  ariaLabelRight = 'Rolar para a direita',
}: ScrollArrowButtonsProps) => {
  // Classes padrão para os botões de navegação
  const defaultButtonClass = 
    "absolute top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-market-green/40";
  
  // Combina as classes padrão com as personalizadas
  const buttonClass = `${defaultButtonClass} ${buttonClassName}`;

  return (
    <>
      {/* Botão de navegação esquerda */}
      {showLeftArrow && (
        <button 
          onClick={onScrollLeft}
          className={`${buttonClass} left-0 -ml-4 ${className}`}
          aria-label={ariaLabelLeft}
        >
          {leftIcon || <ChevronLeft className="text-market-neutral-600" size={iconSize} />}
        </button>
      )}

      {/* Botão de navegação direita */}
      {showRightArrow && (
        <button 
          onClick={onScrollRight}
          className={`${buttonClass} right-0 -mr-4 ${className}`}
          aria-label={ariaLabelRight}
        >
          {rightIcon || <ChevronRight className="text-market-neutral-600" size={iconSize} />}
        </button>
      )}
    </>
  );
};

/*
#
# Ultilização
#

import { ScrollArrowButtons } from '@/components/ScrollArrowButtons';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
()=>{
  const { 
    scrollContainerRef, 
    showLeftArrow, 
    showRightArrow, 
    scrollLeft, 
    scrollRight 
  } = useHorizontalScroll();
  return(
    <ScrollArrowButtons
      onScrollLeft={scrollLeft}
      onScrollRight={scrollRight}
      showLeftArrow={showLeftArrow}
      showRightArrow={showRightArrow}
    />

    <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-6 py-2 px-1 scrollbar-hide">
      {/ * conteúdo das categorias * /}
    </div>
  )
}
*/