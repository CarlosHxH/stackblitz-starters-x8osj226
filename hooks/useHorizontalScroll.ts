import { useRef, useState, useEffect, RefObject } from 'react';

interface UseHorizontalScrollOptions {
  scrollAmount?: number;
  behavior?: ScrollBehavior;
}

interface UseHorizontalScrollReturn {
  scrollContainerRef: RefObject<HTMLDivElement>;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  checkScrollPosition: () => void;
}

/**
 * Hook para gerenciar scroll horizontal com controles de seta
 */
export const useHorizontalScroll = ({
  scrollAmount = 300,
  behavior = 'smooth'
}: UseHorizontalScrollOptions = {}): UseHorizontalScrollReturn => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Verificar se devemos mostrar as setas de navegação
  const checkScrollPosition = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Verificar se há conteúdo para scrollar à esquerda
    setShowLeftArrow(scrollContainer.scrollLeft > 0);

    // Verificar se há mais conteúdo à direita
    const hasMoreContentRight = 
      scrollContainer.scrollWidth > scrollContainer.clientWidth &&
      scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth - 5); // 5px de tolerância
    
    setShowRightArrow(hasMoreContentRight);
  };

  // Função para scroll horizontal para a esquerda
  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft - scrollAmount,
      behavior
    });
  };

  // Função para scroll horizontal para a direita
  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft + scrollAmount,
      behavior
    });
  };

  // Adicionar listener para eventos de scroll e redimensionamento
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Verificar a posição inicial
      checkScrollPosition();
      
      // Adicionar event listeners
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return {
    scrollContainerRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight,
    checkScrollPosition
  };
};