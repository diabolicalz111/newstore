declare global {
  namespace JSX {
    interface IntrinsicElements {
      'square-placement': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-mpid'?: string;
        'data-placement-id'?: string;
        'data-page-type'?: string;
        'data-amount'?: number;
        'data-currency'?: string;
        'data-consumer-locale'?: string;
        'data-item-skus'?: string[];
        'data-item-categories'?: string[];
        'data-is-eligible'?: string;
      };
    }
  }
}

export {};