'use client';

import * as React from 'react';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn, withRef, withVariants } from '@udecode/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { Separator } from './separator';
import { withTooltip } from './tooltip';

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'relative flex select-none items-center'
);

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  'flex items-center'
);

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  'font-medium underline underline-offset-4'
);

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  'bg-border mx-2 my-1 w-px shrink-0'
);

const toolbarButtonVariants = cva(
  cn(
    'text-foreground ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([data-icon])]:size-4'
  ),
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-3',
        lg: 'h-11 px-5',
        sm: 'h-7 px-2',
      },
      variant: {
        default:
          'hover:bg-muted hover:text-muted-foreground aria-checked:bg-accent aria-checked:text-accent-foreground bg-transparent',
        outline:
          'border-input hover:bg-accent hover:text-accent-foreground border bg-transparent',
      },
    },
  }
);

const dropdownArrowVariants = cva(
  cn(
    'text-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-r-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 w-6',
        lg: 'h-11 w-8',
        sm: 'h-7 w-4',
      },
      variant: {
        default:
          'hover:bg-muted hover:text-muted-foreground aria-checked:bg-accent aria-checked:text-accent-foreground bg-transparent',
        outline:
          'border-input hover:bg-accent hover:text-accent-foreground border border-l-0 bg-transparent',
      },
    },
  }
);

const ToolbarButton = withTooltip(
  // eslint-disable-next-line react/display-name
  React.forwardRef<
    React.ElementRef<typeof ToolbarToggleItem>,
    {
      isDropdown?: boolean;
      pressed?: boolean;
    } & Omit<
      React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
      'asChild' | 'value'
    > &
      VariantProps<typeof toolbarButtonVariants>
  >(
    (
      { children, className, isDropdown, pressed, size, variant, ...props },
      ref
    ) => {
      return typeof pressed === 'boolean' ? (
        <ToolbarToggleGroup
          disabled={props.disabled}
          value="single"
          type="single"
        >
          <ToolbarToggleItem
            ref={ref}
            className={cn(
              toolbarButtonVariants({
                size,
                variant,
              }),
              isDropdown && 'justify-between gap-1 pr-1',
              className
            )}
            value={pressed ? 'single' : ''}
            {...props}
          >
            {isDropdown ? (
              <>
                <div className="flex flex-1 items-center gap-2 whitespace-nowrap">
                  {children}
                </div>
                <div>
                  <ChevronDown
                    className="text-muted-foreground size-3.5"
                    data-icon
                  />
                </div>
              </>
            ) : (
              children
            )}
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ToolbarPrimitive.Button
          ref={ref}
          className={cn(
            toolbarButtonVariants({
              size,
              variant,
            }),
            isDropdown && 'pr-1',
            className
          )}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      );
    }
  )
);
ToolbarButton.displayName = 'ToolbarButton';

export { ToolbarButton };

export const ToolbarSplitButton = React.forwardRef<
  React.ElementRef<typeof ToolbarToggleGroup>,
  {
    pressed?: boolean;
    tooltip?: string;
  } & Omit<
    React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
    'asChild' | 'value'
  >
>(({ children, pressed, ...props }, ref) => {
  return (
    <ToolbarToggleGroup
      ref={ref}
      className="group"
      disabled={props.disabled}
      value="single"
      data-pressed={pressed}
      type="single"
    >
      <button className="flex" type="button">
        {children}
      </button>
    </ToolbarToggleGroup>
  );
});

export const ToolbarSplitButtonPrimary = withTooltip(
  React.forwardRef<
    React.ElementRef<typeof ToolbarToggleItem>,
    {
      className?: string;
      size?: 'default' | 'lg' | 'sm';
      variant?: 'default' | 'outline';
    } & Omit<React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>, 'value'>
  >(({ children, className, size, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          className,
          toolbarButtonVariants({
            size,
            variant,
          }),
          'rounded-r-none',
          'group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground'
        )}
        {...props}
      >
        {children}
      </span>
    );
  })
);

export const ToolbarSplitButtonSecondary = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    size?: 'default' | 'lg' | 'sm';
    variant?: 'default' | 'outline';
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, size, variant, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        className,
        dropdownArrowVariants({
          size,
          variant,
        }),
        'group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground'
      )}
      disabled={props.disabled}
      {...props}
    >
      <ChevronDown className="text-muted-foreground size-3.5" data-icon />
    </span>
  );
});

ToolbarSplitButton.displayName = 'ToolbarButton';

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toolbarButtonVariants,
  ['variant', 'size']
);

export const ToolbarGroup = withRef<'div'>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'group/toolbar-group',
        'relative hidden has-[button]:flex',
        className
      )}
    >
      <div className="flex items-center">{children}</div>

      <div className="mx-1.5 py-0.5 group-last/toolbar-group:!hidden">
        <Separator orientation="vertical" />
      </div>
    </div>
  );
});
