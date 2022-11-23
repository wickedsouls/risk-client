import React from 'react';
import { Zones } from './types';
import { Continent, Map, Player } from '../../../store/game';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  onClick: (name: string) => void;
  className?: string;
  players?: Player[];
  conqueredContinents: { name: string; owner: string }[];
  map?: Map<string, string>;
  zoneFrom?: string;
  zoneTo?: string;
  zoneSelected?: string;
  myTurn?: boolean;
}

export const Earth: React.FC<Props> = ({
  onClick,
  players,
  map,
  className,
  zoneFrom,
  zoneTo,
  zoneSelected,
  myTurn,
  conqueredContinents,
}) => {
  if (!map || !players) return null;
  const onSelect = (zone: Zones) => {
    onClick(zone);
  };

  console.log(conqueredContinents);

  // useCB
  const getColor = (zone: string) => {
    const ownerId = map.zones[zone].owner;
    const player = players.find((player) => player.id === ownerId);
    return player?.color;
  };

  const zoneClassName = (zone: string) => {
    return cx(
      'zone',
      `zone--${getColor(zone)}`,
      zoneFrom === zone && 'zone--active',
      zoneTo === zone && 'zone--active',
      zoneSelected === zone && 'zone--active',
    );
  };

  const continentClassname = (continent: string) => {
    let borderColor;
    const isConquered = conqueredContinents.find((c) => c.name === continent);
    if (isConquered) {
      const owner = isConquered.owner;
      const player = players.find((p) => p.id === owner);
      if (player) borderColor = player.color;
    }
    return cx(
      'continent',
      !myTurn && 'continent--with-hover',
      isConquered && 'continent--conquered',
      isConquered && borderColor && `continent--${borderColor}`,
    );
  };

  return (
    <svg
      width="1031"
      height="754"
      viewBox="0 0 1031 754"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx('map', className)}
    >
      <g id="Map">
        <g id="Zones">
          <g id="Peru" onClick={() => onSelect('Peru')}>
            <path
              className={zoneClassName('Peru')}
              id="Peru_2"
              d="M156 496L151.5 494L147.5 502L151.5 508L147.5 514L146.5 521.5L155 532.5V544.5L162 546.5V554L169.5 564H180.5L190.5 579.5L196 580.5L202 600.5H207.5L213 599L218.5 602.5L223.5 600L239.5 612.5L241 622.5H248.5L256 612L248 599L243 571L240 567L222 555L205.5 541L176 530.5L175 520.5L189 511L188.5 507L174 493L163.5 497L156 496Z"
            />
            <text
              id="army"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="192" y="574.785">
                {map.zones['Peru'].armies}
              </tspan>
            </text>
            <text
              id="name"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="189" y="559.418">
                Peru
              </tspan>
            </text>
          </g>
          <g id="Brazil" onClick={() => onSelect('Brazil')}>
            <path
              id="zone"
              d="M175 520.5L189 511L188.5 506L192 484L197.5 479L204.5 485L207.5 482L212 474H229.5L238 477.5L242.5 484.5H247L258 481L266 483L269.5 486.5L270 501L274.5 496H279L280.5 503.5L286 499.5L296.5 509L307 515.5H317L323.5 513.5L339.5 524.5L342 531.5L340.5 543L323.5 557.5L322.5 569.5L318 587.5L309 602L295.5 603L285.5 608.5L283 616.5L278.5 624L277 633L269.5 637L251.5 658.5L244 659L237.5 656L238 651.5L245 635.5L262.5 622.5L261 620L248 599L246 588L243 571L240 567L222 555L206 541.5L176 530.5L175 520.5Z"
              className={zoneClassName('Brazil')}
            />
            <text
              id="name_2"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="244" y="536.418">
                Brazil
              </tspan>
            </text>
            <text
              id="army_2"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="246" y="552.785">
                {map.zones['Brazil'].armies}
              </tspan>
            </text>
          </g>
          <g id="Venezuela" onClick={() => onSelect('Venezuela')}>
            <path
              id="zone_2"
              d="M192 483.5L188.5 507L174 493L163.5 497L156 496L151.5 494V486L157.5 478L158 461.5L168.5 449.5H178.5L185.5 452.5L189.5 451.5L198 449.5L203.5 450L211 445.5L208.5 451L212.5 454L217 451L225 460L229 459.5L243.5 471.5L254 472L259.5 477.5L266 483L258 481L247 484.5H242.5L238 477.5L229.5 474H212L207.5 482L204.5 485L197.5 479L192 483.5Z"
              className={zoneClassName('Venezuela')}
            />
            <text
              id="name_3"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="167" y="463.418">
                Venezuela
              </tspan>
            </text>
            <text
              id="army_3"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="171" y="478.785">
                {map.zones['Venezuela'].armies}
              </tspan>
            </text>
          </g>
          <g id="Central America" onClick={() => onSelect('Central America')}>
            <g id="zone_3">
              <path
                d="M186 421.5V435L196.317 447.773L190 449.5L188.5 446.5L179.5 439L167.5 430.5L166 425L159 424.5L148.5 419L146.5 411L143 404.5L133.5 399L124.5 388L119 378L114.5 370H111.5V374L114.5 384.5L118 392L122 401.5L120.5 404L113.5 393.5L106.5 385.5L105.5 372L96 355H120.5L128 360.5H141.5L152 370.5L156.5 371L159.5 371.5L171.5 381.5L168.5 404.5L174 408.5L183 401.5L188.5 407.5L179.5 419L186 421.5Z"
                className={zoneClassName('Central America')}
              />
              <path
                d="M196.5 448L196.317 447.773M196.317 447.773L186 435V421.5L179.5 419L188.5 407.5L183 401.5L174 408.5L168.5 404.5L171.5 381.5L159.5 371.5L156.5 371L152 370.5L141.5 360.5H128L120.5 355H96L105.5 372L106.5 385.5L113.5 393.5L120.5 404L122 401.5L118 392L114.5 384.5L111.5 374V370H114.5L119 378L124.5 388L133.5 399L143 404.5L146.5 411L148.5 419L159 424.5L166 425L167.5 430.5L179.5 439L188.5 446.5L190 449.5L196.317 447.773Z"
                stroke="black"
                strokeWidth="2"
              />
            </g>
            <text
              id="name_4"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="128" y="380.418">
                Central &#10;
              </tspan>
              <tspan x="128" y="392.418">
                America
              </tspan>
            </text>
            <text
              id="army_4"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="146" y="407.785">
                {map.zones['Central America']?.armies}
              </tspan>
            </text>
          </g>
          <g id="Eastern US" onClick={() => onSelect('Eastern US')}>
            <path
              id="zone_4"
              d="M159.5 371.5L157.5 371L168 364.5V346H175.5V326L202 321V275V272H223L231.5 275.5L240 280V288.5L245.5 294.283V318L250 318.5L255 313H266L272.5 310L277 306.5L288 298H304.5L310.5 301.5L315.5 299L319.5 295.5L324 301L322 303L318 312.5H315.5L315 306H310L303 317L295.5 318.5L289.5 326L278 328L272 335H268.5L266.5 330.5L262.5 331.5L258 342.5L253.5 342L247 347.5L234.5 350L224.5 355L222.5 362L223 371.5L228 378.5V387.5L225 389L222.5 385.5L218 381.5L217 374.5L212 368.5H201.5L195 372L180 372.5L171.5 381.5L159.5 371.5Z"
              className={zoneClassName('Eastern US')}
            />
            <text
              id="name_5"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="186" y="340.418">
                Eastern US
              </tspan>
            </text>
            <text
              id="army_5"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="195" y="355.785">
                {map.zones['Eastern US']?.armies}
              </tspan>
            </text>
          </g>
          <g id="Western US" onClick={() => onSelect('Western US')}>
            <path
              id="zone_5"
              d="M168 364.5L158 371L152 370.5L141.5 360.5H127.5L120.5 355H95.5L95 354L93.5 350L87 341L81.5 333.5V331.5L84.5 329V325.5L81.5 323.5V319.5L84.5 312.5V300L82.5 297L83.5 292L87.5 282L93.5 272H166.5H202V321L175.5 326V346H168V364.5Z"
              className={zoneClassName('Western US')}
            />
            <text
              id="name_6"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="112" y="306.418">
                Western US
              </tspan>
            </text>
            <text
              id="army_6"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="129" y="322.785">
                {map.zones['Western US']?.armies}
              </tspan>
            </text>
          </g>
          <g id="Alberta" onClick={() => onSelect('Alberta')}>
            <path
              id="zone_6"
              d="M186 200.5V272H93.5V261.5H91.5L89 254V239L95 233.5L98 223.5V210L96.5 200.5H186Z"
              fill="#DDDDDD"
              stroke="black"
              className={zoneClassName('Alberta')}
            />
            <text
              id="army_7"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="120" y="240.785">
                {map.zones['Alberta']?.armies}
              </tspan>
            </text>
            <text
              id="name_7"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="112" y="225.418">
                Alberta
              </tspan>
            </text>
          </g>
          <g id="Alaska" onClick={() => onSelect('Alaska')}>
            <path
              id="Alaska_2"
              d="M95 233.5L89 239L87.5 232V228.5V221.5L85 216L82.5 208.5L76.5 203.5L69.5 199.5L67.5 193.5L64.5 187L57 189L52.5 193.5H40L32.5 190.5L25.5 187L24 186L25.5 182V175.5L35 167V163L36.5 158.5V153H32.5L29 155H19.5L18 154V150L22.5 145.5H30V138L27.5 134L20.5 129L16.5 125V120L20.5 118H27.5L29 115L34 108L42 101L51 100L56.5 95.5L60.5 96.5H65.5L70.5 102L77.5 102.5L80 106.5L85 108L87.5 112.5L95.5 117L96.5 200.5L98 210V223.5L95 233.5Z"
              className={zoneClassName('Alaska')}
            />
            <text
              id="army_8"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="52" y="148.785">
                {map.zones['Alaska']?.armies}
              </tspan>
            </text>
            <text
              id="name_8"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="45" y="132.418">
                Alaska
              </tspan>
            </text>
          </g>

          <g id="Alaska" onClick={() => onSelect('Alaska')}>
            <path
              id="Alaska_2"
              d="M95 233.5L89 239L87.5 232V228.5V221.5L85 216L82.5 208.5L76.5 203.5L69.5 199.5L67.5 193.5L64.5 187L57 189L52.5 193.5H40L32.5 190.5L25.5 187L24 186L25.5 182V175.5L35 167V163L36.5 158.5V153H32.5L29 155H19.5L18 154V150L22.5 145.5H30V138L27.5 134L20.5 129L16.5 125V120L20.5 118H27.5L29 115L34 108L42 101L51 100L56.5 95.5L60.5 96.5H65.5L70.5 102L77.5 102.5L80 106.5L85 108L87.5 112.5L96.5 117V200.5L98 210V223.5L95 233.5Z"
              className={zoneClassName('Alaska')}
            />
            <text
              id="army_8"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="52" y="148.785">
                {map.zones['Alaska']?.armies}
              </tspan>
            </text>
            <text
              id="name_8"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="45" y="132.418">
                Alaska
              </tspan>
            </text>
          </g>

          <g
            id="Northwest Territory"
            onClick={() => onSelect('Northwest Territory')}
          >
            <g id="zone_7">
              <path d="M149.5 106.5L148 100.5L155.5 98.5L153.5 93.5L152 90L153.5 86L158 80L165 83L166.5 90L172 98.5V103.5H166.5L159.5 108L149.5 106.5Z" />
              <path d="M187 83H180.5L174 89L175 97H183V91.5L189 90L187 83Z" />
              <path d="M194.5 95L189 93.5L185 100.5H178.5L174 106.5V112L180.5 116L185 112L192 110.5L194.5 116L189 120.5L192 124L199.5 120.5L206.5 124L210.5 129.5L202 131L194.5 133.5L198 138H210.5L213 135H224L234 140V135L230 131V127.5V120.5L224 117.5L213 110.5L199.5 108V103.5L194.5 100.5V95Z" />
              <path d="M96.5 200.5V117H106L110.5 117.5L119.5 112L122.5 117.5L131.5 110.5L135.5 116L143.5 120.5H149.5L162 131L163 138L176 140L184 136.5V144L183 147.5L187.5 151L194.5 148.5L199.5 152L194.5 158.5L199.5 161.5L201 157.5L207.5 156.5L210.5 160.5L216 161.5V200.5H96.5Z" />
              <path
                d="M149.5 106.5L148 100.5L155.5 98.5L153.5 93.5L152 90L153.5 86L158 80L165 83L166.5 90L172 98.5V103.5H166.5L159.5 108L149.5 106.5Z"
                className={zoneClassName('Northwest Territory')}
              />
              <path
                d="M187 83H180.5L174 89L175 97H183V91.5L189 90L187 83Z"
                className={zoneClassName('Northwest Territory')}
              />
              <path
                d="M194.5 95L189 93.5L185 100.5H178.5L174 106.5V112L180.5 116L185 112L192 110.5L194.5 116L189 120.5L192 124L199.5 120.5L206.5 124L210.5 129.5L202 131L194.5 133.5L198 138H210.5L213 135H224L234 140V135L230 131V127.5V120.5L224 117.5L213 110.5L199.5 108V103.5L194.5 100.5V95Z"
                className={zoneClassName('Northwest Territory')}
              />
              <path
                d="M96.5 200.5V117H106L110.5 117.5L119.5 112L122.5 117.5L131.5 110.5L135.5 116L143.5 120.5H149.5L162 131L163 138L176 140L184 136.5V144L183 147.5L187.5 151L194.5 148.5L199.5 152L194.5 158.5L199.5 161.5L201 157.5L207.5 156.5L210.5 160.5L216 161.5V200.5H96.5Z"
                className={zoneClassName('Northwest Territory')}
              />
            </g>
            <text
              id="army_9"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="141" y="186.785">
                {map.zones['Northwest Territory']?.armies}
              </tspan>
            </text>
            <text
              id="name_9"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="104.061" y="170.418">
                Northwest Territory
              </tspan>
            </text>
          </g>

          <g id="Greenland" onClick={() => onSelect('Greenland')}>
            <g id="zone_8">
              <path
                d="M241 199.5H216V196V158.5L216.5 156L219 148H226L230 151.5L236 149.5V144H241L244.5 149.5L249.5 148L250.5 144L254.5 140L249.5 132V121.5L254.5 116L260 123L262.5 137L267.5 140L271 135H274.5V143L280.5 149.5V146.5V140L285 135L288 140L287 154.5L282.5 158.5H273L262.5 169.5L267.5 174.5L262.5 181H258L254.5 185.5H247.5L244.5 191L241 199.5Z"
                className={zoneClassName('Greenland')}
              />
              <path
                d="M309 177L303 174.5L299.5 176L298.5 184H303L305 189H309L312.5 185.5L316 187L318 198L334.5 212.5L337 209.5L332 200.5L329 194H332H340.5L342 190.5L336 181L332 175.5L336 169.5L340.5 175.5L346 178L350.5 170.5V166.5H346L343 161.5L338.5 156L331 151.5L332 145.5L331 132H325.5V123L318 120.5L317 109L310 101.5L305 104V98.5L302 93.5H293.5L291.5 91H285L287 98.5L282.5 102L278.5 97L274.5 89.5L276.5 85V79.5L267.5 83.5L262.5 91L264.5 95.5V104L273 110.5L274.5 117L283.5 123L293.5 125.5L302 123L306.5 127.5V135L309 144L311 148L309 154.5V161.5L312.5 166.5V174.5L309 177Z"
                className={zoneClassName('Greenland')}
              />
              <path
                d="M395.5 167.5L388 159L386 150L382 147L384 141.5L382 130L379.5 117L375 105.5L369 109L365.5 105.5L361 92L364 81.5L365.5 72L353.5 71L344 72L341 63.5L343 56.5H351L352 48.5L346 40.5L350 31H357.5L362.5 35.5L366.5 31L365.5 23.5V18.5L374.5 11.5L384.5 14L391 20L396 18.5L401 9.5L415.5 7L424 11.5L422 16L426.5 21.5L420.5 26L412 29L413.5 31L420.5 29L424 33.5L426.5 29L432.5 30V37.5L426.5 42.5V50L424 55.5L430 56.5L435.5 52.5L439 44.5L451 48.5L450 55.5L442 57.5V64.5H452.5V72L445.5 76.5V81.5L451 84.5L449 88.5L447.5 97L440.5 98.5L437.5 104.5L444 109V114.5H440.5V123H432.5L430 127L432.5 135L426.5 139L417.5 150L413.5 161.5L411.5 178L400 176.5L395.5 167.5Z"
                className={zoneClassName('Greenland')}
              />
              <path
                d="M241 199.5H216V196V158.5L216.5 156L219 148H226L230 151.5L236 149.5V144H241L244.5 149.5L249.5 148L250.5 144L254.5 140L249.5 132V121.5L254.5 116L260 123L262.5 137L267.5 140L271 135H274.5V143L280.5 149.5V146.5V140L285 135L288 140L287 154.5L282.5 158.5H273L262.5 169.5L267.5 174.5L262.5 181H258L254.5 185.5H247.5L244.5 191L241 199.5Z"
                stroke="black"
                className={zoneClassName('Greenland')}
                strokeWidth="2"
              />
              <path
                d="M309 177L303 174.5L299.5 176L298.5 184H303L305 189H309L312.5 185.5L316 187L318 198L334.5 212.5L337 209.5L332 200.5L329 194H332H340.5L342 190.5L336 181L332 175.5L336 169.5L340.5 175.5L346 178L350.5 170.5V166.5H346L343 161.5L338.5 156L331 151.5L332 145.5L331 132H325.5V123L318 120.5L317 109L310 101.5L305 104V98.5L302 93.5H293.5L291.5 91H285L287 98.5L282.5 102L278.5 97L274.5 89.5L276.5 85V79.5L267.5 83.5L262.5 91L264.5 95.5V104L273 110.5L274.5 117L283.5 123L293.5 125.5L302 123L306.5 127.5V135L309 144L311 148L309 154.5V161.5L312.5 166.5V174.5L309 177Z"
                stroke="black"
                className={zoneClassName('Greenland')}
                strokeWidth="2"
              />
              <path
                d="M395.5 167.5L388 159L386 150L382 147L384 141.5L382 130L379.5 117L375 105.5L369 109L365.5 105.5L361 92L364 81.5L365.5 72L353.5 71L344 72L341 63.5L343 56.5H351L352 48.5L346 40.5L350 31H357.5L362.5 35.5L366.5 31L365.5 23.5V18.5L374.5 11.5L384.5 14L391 20L396 18.5L401 9.5L415.5 7L424 11.5L422 16L426.5 21.5L420.5 26L412 29L413.5 31L420.5 29L424 33.5L426.5 29L432.5 30V37.5L426.5 42.5V50L424 55.5L430 56.5L435.5 52.5L439 44.5L451 48.5L450 55.5L442 57.5V64.5H452.5V72L445.5 76.5V81.5L451 84.5L449 88.5L447.5 97L440.5 98.5L437.5 104.5L444 109V114.5H440.5V123H432.5L430 127L432.5 135L426.5 139L417.5 150L413.5 161.5L411.5 178L400 176.5L395.5 167.5Z"
                stroke="black"
                className={zoneClassName('Greenland')}
                strokeWidth="2"
              />
            </g>
            <text
              id="army_10"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="393" y="92.7852">
                {map.zones['Greenland']?.armies}
              </tspan>
            </text>
            <text
              id="name_10"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="379" y="72.418">
                Greenland
              </tspan>
            </text>
          </g>
          <g id="Iceland" onClick={() => onSelect('Iceland')}>
            <path
              id="zone_9"
              d="M455 166.5L453 159L461 158L465 161L471 159L477 152.5L488 159V169L480.5 177L472.5 182L468.5 180L459 178.5L455 172V166.5Z"
              className={zoneClassName('Iceland')}
            />
            <text
              id="army_11"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="461" y="173.785">
                {map.zones['Iceland']?.armies}
              </tspan>
            </text>
            <text
              id="name_11"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="455" y="146.418">
                Iceland
              </tspan>
            </text>
          </g>
          <g id="Great Britain" onClick={() => onSelect('Great Britain')}>
            <g id="zone_10">
              <path
                d="M450.5 305.5L454 301.5L458.5 304L460 311V319.5L456 324.5H448.5L445 322L446.5 315.5V308L450.5 305.5Z"
                className={zoneClassName('Great Britain')}
              />
              <path
                d="M461.5 294.5V281.5L469.5 276.5L472.5 283L476 286.5L474 296.5L480.5 304L488 313.5L486.5 322H479L474 326.5L469.5 329L466 322L463.5 315.5L469.5 311V306H464.5L463.5 301.5L461.5 294.5Z"
                className={zoneClassName('Great Britain')}
              />
              <path
                d="M450.5 298L448.5 296.5L452.5 291L454 294.5L450.5 298Z"
                className={zoneClassName('Great Britain')}
              />
              <path
                d="M450.5 305.5L454 301.5L458.5 304L460 311V319.5L456 324.5H448.5L445 322L446.5 315.5V308L450.5 305.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Great Britain')}
              />
              <path
                d="M461.5 294.5V281.5L469.5 276.5L472.5 283L476 286.5L474 296.5L480.5 304L488 313.5L486.5 322H479L474 326.5L469.5 329L466 322L463.5 315.5L469.5 311V306H464.5L463.5 301.5L461.5 294.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Great Britain')}
              />
              <path
                d="M450.5 298L448.5 296.5L452.5 291L454 294.5L450.5 298Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Great Britain')}
              />
            </g>
            <text
              id="army_12"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="472" y="318.785">
                {map.zones['Great Britain']?.armies}
              </tspan>
            </text>
            <text
              id="name_12"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="427.439" y="275.418">
                Great&#10;
              </tspan>
              <tspan x="425.14" y="287.418">
                Britain
              </tspan>
            </text>
          </g>
          <g id="Western Europe" onClick={() => onSelect('Western Europe')}>
            <path
              id="zone_11"
              d="M468 353L472.5 348L486 341L497 343.5L504 353.5L505.5 356.5L506.5 360V373L504.5 378H497L489 379L486 386L478.5 387.5V399L475.5 405.5H469L463 408.5L454.5 405.5L445 401.5V393L442.5 386V379L448 374H465.5L475.5 373V367.5L472.5 362.5H468L463 359.5V356.5L468 353Z"
              className={zoneClassName('Western Europe')}
            />
            <text
              id="army_13"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="478" y="373.785">
                {map.zones['Western Europe']?.armies}
              </tspan>
            </text>
            <text
              id="name_13"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="8"
              letterSpacing="0em"
            >
              <tspan x="448" y="386.234">
                Western&#10;
              </tspan>
              <tspan x="448" y="395.234">
                Europe
              </tspan>
            </text>
          </g>
          <g id="Northern Europe" onClick={() => onSelect('Northern Europe')}>
            <path
              id="zone_12"
              d="M507 310L509 296L514.5 294.5V303.5L520.5 308.5L530 302L540 296L548.5 293L550.5 308.5L549 312.5L541.5 322V336L540 346.5H535L532.5 339L528 335.5L521.5 346.5H514L504 353.5L497 343.5L486 341V335.5L490.5 326L502.5 317L507 310Z"
              className={zoneClassName('Northern Europe')}
            />
            <text
              id="army_14"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="497" y="335.785">
                {map.zones['Northern Europe']?.armies}
              </tspan>
            </text>
            <text
              id="name_14"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="8"
              letterSpacing="0em"
            >
              <tspan x="506.211" y="319.234">
                Northern&#10;
              </tspan>
              <tspan x="509.59" y="328.234">
                Europe
              </tspan>
            </text>
          </g>
          <g id="Scandinavia" onClick={() => onSelect('Scandinavia')}>
            <path
              id="zone_13"
              d="M551 150L537.5 148.5L534 157.5L526.5 159L517.5 163L509 176V184.5L511 191.5L512.5 195.5L511 205L502.5 218.5V227L495.5 232.5L486.5 235.5V241L489 243.5L491 253V268.5L498.5 274.5L506 271.5L515.5 270L522 282L530 284.5L535.5 279.5V266.5L538.5 261L537.5 250.5L535.5 242L537.5 232.5L540.5 222.5L551 206L552.5 211.5L555 215.5L551 224.5V250.5L555 260.5H562L567.5 257V250.5V227L569 224.5V217L559 199.5L557.5 183L551 163V150Z"
              className={zoneClassName('Scandinavia')}
            />
            <text
              id="army_15"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="513" y="223.785">
                {map.zones['Scandinavia']?.armies}
              </tspan>
            </text>
            <text
              id="name_15"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="499.011" y="247.418">
                Scandi-&#10;
              </tspan>
              <tspan x="503.698" y="259.418">
                navia
              </tspan>
            </text>
          </g>
          <g id="Ukraine" onClick={() => onSelect('Ukraine')}>
            <path
              id="zone_14"
              d="M563 151.5L551 150V163L557.5 183L559 199.5L569 217V224.5L567.5 227V256.5L570.5 257L574.5 261.5L581 263L583 265.5H576.5H572.5L565.5 268L562 271.5L557 279L553 287L548.5 293.5L550.5 308.5L549 312.5L541.5 322V336H552L558 342L572.5 341L578.5 333L583 330.5L590.5 332L591.5 336H583L576.5 343V347H587L591.5 344.5L595 347L592 352.5L593 357L600 372H608.5L611.5 375L613.5 380.5L620 379V369.5L614.5 357.5V348L621 344.5L624.5 342.5L623 328L628.5 319.5L623 298L624.5 295H643L650 289L672 258.5L674 236.5L673 236L660 216V193L671 179.5L674.5 169L675.5 163.5L681.5 162L680 153L674.5 147L673 144L679 135.5L680 128.5L677 118.5H674L669.5 113.5H664.5L660.5 117L661.5 126V133.5L656 137.5L653 136H645.5L642 145.5L640.5 157H637.5L635 149.5L636.5 147.5V144H632L624 157L620 155H610.5L606.5 161L610.5 165.5L611.5 169.5H603.5L597.5 173.5L597 180L602.5 186.5V190.5H599.5L583 180L567.5 174L570 171.5L581.5 175H589.5V168.5L585.5 157L579.5 149.5H567L563 151.5Z"
              className={zoneClassName('Ukraine')}
            />
            <text
              id="army_16"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="607" y="266.785">
                {map.zones['Ukraine']?.armies}
              </tspan>
            </text>
            <text
              id="name_16"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="599" y="245.418">
                Ukraine
              </tspan>
            </text>
          </g>
          <g id="Afghanistan" onClick={() => onSelect('Afghanistan')}>
            <path
              id="zone_15"
              d="M630.5 377L632.5 382L633.5 383.5L648.5 374.5H658L662.5 379H669L678 386.5L690 377H695L699 374.5H711L715.5 371.5L717.5 367L714.5 359V344.5L719.5 337.5V329.5L725 323L727.5 315.5L745.5 290L741 281V271.5L735 267.5L729.5 265.5L721.5 255.5L716 250L705.5 248L696 242L682 240.5L674 236.5L672 258.5L650 289L643.5 295H624.5L623 298L628.5 319.5L623 328L624.5 343L629.5 344.5L633.5 347L630.5 353L627 354.5L628.5 359.5V366.5L632.5 371.5L630.5 377Z"
              className={zoneClassName('Afghanistan')}
            />
            <text
              id="army_17"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="666" y="327.785">
                {map.zones['Afghanistan']?.armies}
              </tspan>
            </text>
            <text
              id="name_17"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="650" y="309.418">
                Afghanistan
              </tspan>
            </text>
          </g>
          <g id="Ural" onClick={() => onSelect('Ural')}>
            <path
              id="zone_16"
              d="M660 216L673 236L682 240.5L696 242L705.5 248L716 250L721.5 255.5L729.5 265.5L735.5 267.5L741 271.5V281L745.5 290L755 281L761 278L761.5 271L755 249.5V216L751.5 205V181L744 168.5L740.5 157.5L738 140.5L740.5 133.5L741 115.5L738.5 115L736.5 107.5L737 99L735.5 93L733 88.5H731V94V100L725.5 105V107.5L729.5 112V115.5L726.5 116.5L724.5 123L721.5 122.5L720.5 119L716 118.5L707.5 120L699.5 123L698 120L703 115.5L712 112L719.5 109.5L721 101L719.5 94V81L714.5 74L713.5 68.5L712 61.5V55.5L713.5 51L710 47L708 42.5L709 32.5L706.5 31.5L702.5 35L698 48V58L694.5 61.5L694 73L699.5 82.5V91.5L694.5 99H691L687 96.5H681.5L675.5 104V111L679 115.5L677 118.5L680 128.5L679 135.5L673 144L674.5 147L680 153L681.5 162L675.5 163.5L674.5 169L671 179.5L660 193V216Z"
              className={zoneClassName('Ural')}
            />
            <text
              id="army_18"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="687" y="212.785">
                {map.zones['Ural']?.armies}
              </tspan>
            </text>
            <text
              id="name_18"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="687" y="194.418">
                Ural
              </tspan>
            </text>
          </g>
          <g id="Siberia" onClick={() => onSelect('Siberia')}>
            <path
              id="zone_17"
              d="M746 111L741 115.5L740.5 133.5L738 140.5L740.5 157.5L744 168.5L751.5 181V205L755 215.5V249.5L761.5 271L761 278H771L779.5 271.5L787.5 267V252L789 246.5L792.5 239.5L795 226L795.5 221.5L797 219.5H798L800 221.5H805L808 219V212.5L810 209.5V201L811.5 198.5V190.5L802 175L797 154.5V135.5V131.5L803 124V106.5L809.5 99.5V95L815 90V68L817 61L826 52.5V45.5L823 34V20L820 19.5L815.5 18.5L813 16L809 15L800 16.5L794.5 21H789.5L786.5 20H775L770.5 24H764L763.5 28.5L760 29.5V33L764 33.5V37.5L760.5 40L752.5 48L752 53.5L758.5 61.5L757.5 68L760.5 77L765 84.5V92L768.5 96.5V111H765L764 109.5L762 100L760.5 95L757.5 88.5L752.5 83.5V76.5L749 72V68.5L750.5 66V61L747 59.5L746 64L743.5 64.5L741.5 59.5H739.5L738 64.5H735L734 62.5L732.5 58.5H728V78L733.5 80L738 78L740.5 80.5L748 80L750.5 92.5L757.5 103.5V113.5L761.5 121V128L760 130.5L756 125L752.5 115.5L750.5 109.5L746 104.5V111Z"
              className={zoneClassName('Siberia')}
            />
            <text
              id="army_19"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="761" y="178.785">
                {map.zones['Siberia']?.armies}
              </tspan>
            </text>
            <text
              id="name_19"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="755" y="161.418">
                Siberia
              </tspan>
            </text>
          </g>
          <g id="Yakutsk" onClick={() => onSelect('Yakutsk')}>
            <path
              id="zone_18"
              d="M824.5 17L823 19.5V34L826 45.5V52.5L817 61L815 68V90L809.5 95V99.5L803 106.5V124L797 131.5V136H804L805.5 134H812.5L817 137.5H825L832 131H840L842.5 132.5L848.5 134L857 138.5V143L850 147L846.5 151.5V159L848.5 160.5L860 176.5V184.5L861.5 188H866L870 195V197.5L876 195.5L878 189.5V173.5L879 167.5L883.5 161L893 157.5L909.5 155.5L924.5 152L933.5 145L937.5 132.5L945.5 120L962.5 100L964 80.5V42.5L962.5 25.5V5.5H952.5L951.5 9L944.5 17H940L932 24H921L916 29.5L912.5 28H904.5L902.5 25.5L893 17L879.5 15.5V12.5L882 11V9H871L867 5H864L859.5 9V14.5L856.5 17L852.5 15.5H843L837 22.5L833.5 25.5L831 24L832 20.5V17H824.5Z"
              className={zoneClassName('Yakutsk')}
            />
            <text
              id="army_20"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="853" y="117.785">
                {map.zones['Yakutsk']?.armies}
              </tspan>
            </text>
            <text
              id="name_20"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="844" y="98.418">
                Yakutsk
              </tspan>
            </text>
          </g>
          <g id="Irkutsk" onClick={() => onSelect('Irkutsk')}>
            <path
              id="zone_19"
              d="M793 264L787.5 267V252L789 246.5L792.5 239.5L795 226.5L795.5 221.5L797 219.5H798L800 221.5H805L808 219V212.5L810 209.5V201L811.5 198.5V190.5L802 175L797 154V136H804L805.5 134H812.5L817 137.5H825L832 131H839.5L842 132.5L848.5 134L857 138.5V143L850 147L846.5 151.5V159L848.5 160.5L860 176.5V184.5L861.5 188H866L870 195V201L860 212.5V216L865 223V231.5L868.5 238V252.5H859L851.5 247H841L826 254H814.5L802.5 262L793 264Z"
              className={zoneClassName('Irkutsk')}
            />
            <text
              id="army_21"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="828" y="215.785">
                {map.zones['Irkutsk']?.armies}
              </tspan>
            </text>
            <text
              id="name_21"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="822" y="200.418">
                Irkutsk
              </tspan>
            </text>
          </g>
          <g id="Mongolia" onClick={() => onSelect('Mongolia')}>
            <path
              id="zone_20"
              d="M836.5 299.5L836 297H835H829.5L825.5 296H814.5L811 298H802.5L786 286L773.5 284L771 278L779.5 271.5L787 267.5L793 264L802.5 262L814.5 254H826L841 247H851.5L859 252.5H868.5L872.5 261L869 276L867 282.5V300.5L863.5 303.5V308L868.5 314.5V317.5L866.5 319.5H863.5L858 316.5L857 311L850 310.5V306L846.5 303L842 302H838L836.5 299.5Z"
              className={zoneClassName('Mongolia')}
            />
            <text
              id="army_22"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="823" y="286.785">
                {map.zones['Mongolia']?.armies}
              </tspan>
            </text>
            <text
              id="name_22"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="811" y="273.418">
                Mongolia
              </tspan>
            </text>
          </g>
          <g id="Japan" onClick={() => onSelect('Japan')}>
            <g id="zone_21">
              <path
                d="M880.5 321.5V313.5L885.5 306.5L893 305.5V301.5L890.5 299L892 296L895 291L899.5 289.5L897.5 286.5V280L905 278L913.5 283V301.5L902 308L903.5 313.5L893 320L890.5 334L885.5 336L883.5 330.5L880.5 321.5Z"
                className={zoneClassName('Japan')}
              />
              <path
                d="M905.5 271.5L896.5 274.5L899.5 267.5L901 264.5L899.5 262L902 258.5L905.5 260L911.5 261L916 265.5L913.5 271L905.5 271.5Z"
                className={zoneClassName('Japan')}
              />
              <path
                d="M880.5 321.5V313.5L885.5 306.5L893 305.5V301.5L890.5 299L892 296L895 291L899.5 289.5L897.5 286.5V280L905 278L913.5 283V301.5L902 308L903.5 313.5L893 320L890.5 334L885.5 336L883.5 330.5L880.5 321.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Japan')}
              />
              <path
                d="M905.5 271.5L896.5 274.5L899.5 267.5L901 264.5L899.5 262L902 258.5L905.5 260L911.5 261L916 265.5L913.5 271L905.5 271.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Japan')}
              />
            </g>
            <text
              id="army_23"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="895" y="301.785">
                {map.zones['Japan']?.armies}
              </tspan>
            </text>
            <text
              id="name_23"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="911" y="316.418">
                Japan
              </tspan>
            </text>
          </g>
          <g id="China" onClick={() => onSelect('China')}>
            <path
              id="China_2"
              d="M714.5 359L717.5 367L725.5 365L737.5 365.5L740.5 371L737 375.5L740.5 379.5L751 378L766 386L770 384H781.5L795 366.5H800.5L801.5 368V377L804.5 382H807.5L812.5 375H815.5L817.5 377.5L826 376L831 372L838.5 369L841 361L846.5 355.5L848 349L850.5 345.5L844 338.5V331.5L838.5 325V320H844V316H840L836.5 312.5L834 307.5L831 305.5L836.5 299.5L836 297H829.5L825.5 296H814.5L811 298H802.5L785.5 286L773.5 284L771 278H761L755 281L745.5 290L727.5 315.5L725 323L719.5 329.5V337.5L714.5 344.5V359Z"
              className={zoneClassName('China')}
            />
            <text
              id="army_24"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="770" y="341.785">
                {map.zones['China']?.armies}
              </tspan>
            </text>
            <text
              id="name_24"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="766" y="326.418">
                China
              </tspan>
            </text>
          </g>
          <g id="Siam" onClick={() => onSelect('Siam')}>
            <path
              id="zone_22"
              d="M761 395L759.5 397.5L763.5 404H771L777 405L777.5 411.5L780.5 414.5L782.5 412L785.5 410L793 417L796 426L798 432.5L815 452L818 452.5V449.5L814.5 442V436.5L803 426L802 416H810L818 425L820 423L827.5 410V406.5L826 403.5L814.5 392.5V385L817.5 382V377.5L815.5 375H812.5L807.5 382H804.5L801.5 377.5V368L800.5 366.5H795L781.5 384H770L766 386L761 395Z"
              className={zoneClassName('Siam')}
            />
            <text
              id="army_25"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="787" y="406.785">
                {map.zones['Siam']?.armies}
              </tspan>
            </text>
            <text
              id="name_25"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="783" y="395.418">
                Siam
              </tspan>
            </text>
          </g>
          <g id="Indonesia" onClick={() => onSelect('Indonesia')}>
            <g id="zone_23">
              <path
                d="M785 464.5L782.5 458.5H793.5L806.5 470L808.5 475L816.5 480.5V489L814.5 491.5L803.5 484V478L797 475V471.5L791 468.5L785 464.5Z"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M830 467L827.5 461V454L833 449.5H843L846.5 442L851.5 440L855 443.5V447.5V456.5L851.5 467L848 478H841L838 475L830 471.5V467Z"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M878 454L867.5 456.5L863.5 464.5L861 468.5L858.5 475H863.5L867.5 471.5L871.5 473V464.5V461L876 456.5L878 454Z"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M871.5 436L874 432.5H881L886.5 436L881 440H874L871.5 436Z"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M867.5 427L870 423L874 425.5L870 429L867.5 427Z"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M878 425.5L879.5 421L885 423L881 427L878 425.5Z"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M874 412.5L870 417L863.5 412.5V401L867.5 398L870 403.5V410L874 412.5Z"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M785 464.5L782.5 458.5H793.5L806.5 470L808.5 475L816.5 480.5V489L814.5 491.5L803.5 484V478L797 475V471.5L791 468.5L785 464.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M830 467L827.5 461V454L833 449.5H843L846.5 442L851.5 440L855 443.5V447.5V456.5L851.5 467L848 478H841L838 475L830 471.5V467Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M878 454L867.5 456.5L863.5 464.5L861 468.5L858.5 475H863.5L867.5 471.5L871.5 473V464.5V461L876 456.5L878 454Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M871.5 436L874 432.5H881L886.5 436L881 440H874L871.5 436Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M867.5 427L870 423L874 425.5L870 429L867.5 427Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M878 425.5L879.5 421L885 423L881 427L878 425.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Indonesia')}
              />
              <path
                d="M874 412.5L870 417L863.5 412.5V401L867.5 398L870 403.5V410L874 412.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Indonesia')}
              />
            </g>
            <text
              id="army_26"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="832" y="466.785">
                {map.zones['Indonesia']?.armies}
              </tspan>
            </text>
            <text
              id="name_26"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="824" y="492.418">
                Indonesia
              </tspan>
            </text>
          </g>
          <g id="New Guinea" onClick={() => onSelect('New Guinea')}>
            <path
              id="zone_24"
              d="M896 458L899.5 453.5L912 460L916.5 456.5L920.5 463L927.5 465.5L934.5 460H946L949.5 468L962 470.5V479L966.5 487L957.5 484.5L946 482.5L937 484.5L933 479H926L919.5 473.5L910 468H897.5L899.5 464L896 458Z"
              className={zoneClassName('New Guinea')}
            />
            <text
              id="army_27"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="930" y="476.785">
                {map.zones['New Guinea']?.armies}
              </tspan>
            </text>
            <text
              id="name_27"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="916" y="449.418">
                New Guinea
              </tspan>
            </text>
          </g>
          <g
            id="Eastern Australia"
            onClick={() => onSelect('Eastern Australia')}
          >
            <path
              id="zone_25"
              d="M910.5 545.5L897.5 509L906 507.5L904.5 503.5V495L906 493L924 505H934.5L937.5 511L949 517H955.5L964.5 531L966.5 540L964.5 557V566.5L955.5 573L952 574.5L947 579.5H937.5L934.5 577.5H928L925.5 569.5H920L917 577.5L908 571H902L894.5 574.5L887.5 559L910.5 545.5Z"
              className={zoneClassName('Eastern Australia')}
            />
            <text
              id="army_28"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="926" y="560.785">
                {map.zones['Eastern Australia']?.armies}
              </tspan>
            </text>
            <text
              id="name_28"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="918.11" y="528.418">
                Eastern&#10;
              </tspan>
              <tspan x="915.322" y="540.418">
                Australia
              </tspan>
            </text>
          </g>
          <g
            id="Western Australia"
            onClick={() => onSelect('Western Australia')}
          >
            <path
              id="zone_26"
              d="M910.5 545.5L897.5 509L888.5 503.5L883.5 502.5L879 500H872.5V503.5L867.5 507L864.5 516.5L856 517.5L855 526.5L848.5 531.5L847.5 536L851.5 539.5L848.5 543.5L844 544.5L836.5 552.5L831.5 560V567L836.5 571.5L837.5 578.5L842.5 581L845.5 588.5L851.5 589.5L853.5 594.5L858.5 601H866L868 597.5L872.5 591.5L885 590.5L888.5 582.5L894.5 574.5L887.5 559L910.5 545.5Z"
              className={zoneClassName('Western Australia')}
            />
            <text
              id="army_29"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="862" y="565.785">
                {map.zones['Western Australia']?.armies}
              </tspan>
            </text>
            <text
              id="name_29"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="857.66" y="536.418">
                Western&#10;
              </tspan>
              <tspan x="856.322" y="548.418">
                Australia
              </tspan>
            </text>
          </g>
          <g id="India" onClick={() => onSelect('India')}>
            <path
              id="zone_27"
              d="M677.5 409.5V386.5L690 377H695L699 374.5H711L715.5 371.5L717.5 367L726 365L737.5 365.5L740.5 371L737 375.5L740.5 379.5L751 378L766 386L760 397L747.5 405.5V414L736 426.5V444.5L729.5 453.5L720 445.5L719.5 439L709.5 428.5L705 420L700.5 423V417.5L691 413.5L692.5 416.5L690 417.5L677.5 409.5Z"
              className={zoneClassName('India')}
            />
            <text
              id="army_30"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="712" y="409.785">
                {map.zones['India']?.armies}
              </tspan>
            </text>
            <text
              id="name_30"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              fontWeight="500"
              letterSpacing="0em"
            >
              <tspan x="709" y="396.418">
                India
              </tspan>
            </text>
          </g>
          <g id="Kamchatka" onClick={() => onSelect('Kamchatka')}>
            <path
              id="zone_28"
              d="M876.5 278.5L867.5 281.5L872.5 261L868.5 252.5V248.5V238L865 231.5V223L860 216V212.5L870 201V197.5L876 195.5L878 189.5V174L879 167.5L883.5 161L893.5 157.5L910 155.5L924.5 152L933.5 145L937.5 132.5L945.5 120L962.5 100L964 80.5V43L962.5 25.5V5.5L970 0.5L971.5 3L976.5 8.5L978.5 13.5H981.5L987.5 19L992 27.5L1000 38L1004.5 46L1008 54.5V59.5L1002 65L1000 77L993.5 84.5L989 111.5L976.5 128L970 132V137L967.5 139.5L959 146.5L951 158L948 167.5L951 183L952 194L949.5 203V215L948 217L944 213L938.5 202L937.5 189L940 172.5V165.5L944 159V155L942 152.5L938.5 153.5V159L935.5 162L932 160.5L929.5 161L926.5 170L916 187H911L905 190.5L902 189L898.5 189.5L890 199V203L886.5 207.5L882 213V219.5L888 224.5L890 220.5L893 220V230.5L895 233.5L893.5 237L893 247.5L889 253.5L887.5 261L881 270.5L876.5 278.5Z"
              className={zoneClassName('Kamchatka')}
            />
            <text
              id="name_31"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="8"
              letterSpacing="0em"
            >
              <tspan x="966" y="58.2344">
                Kamchatka
              </tspan>
            </text>
            <text
              id="army_31"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="975" y="75.7852">
                {map.zones['Kamchatka']?.armies}
              </tspan>
            </text>
          </g>
          <g id="Middle East" onClick={() => onSelect('Middle East')}>
            <path
              id="zone_29"
              d="M590 355.5L592 352.5L593 357L600 372H608.5L611.5 375L613.5 382L616.5 385L622 389.5H628V386.5H633L633.5 383.5L648.5 374.5H658L662.5 379H669L677.5 386V410L669 412L664.5 408H654L648.5 405.5L643.5 402L638.5 401L636.5 403.5L639.5 407.5L651.5 415L652 421L657.5 427L660 425.5V421.5L663 418L666 419.5V430.5L660 435.5L659 439.5L654.5 440.5L652 445.5L644.5 450L631 462.5H628L620.5 452.5L614 446L606 441L603.5 436.5L596 424.5L590 423L585.5 417L586 406L590.5 399.5L593 391.5L592 385H572L568 382.5L563 380L561.5 376L566 370.5L582 355.5H590Z"
              className={zoneClassName('Middle East')}
            />
            <text
              id="army_32"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="611" y="432.785">
                {map.zones['Middle East']?.armies}
              </tspan>
            </text>
            <text
              id="name_32"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="601.407" y="404.418">
                Middle&#10;
              </tspan>
              <tspan x="606.72" y="416.418">
                East
              </tspan>
            </text>
          </g>
          <g id="Egypt" onClick={() => onSelect('Egypt')}>
            <path
              id="zone_30"
              d="M490.5 445.5L504.5 423L513 425L516.5 421.5H521.5L529 426.5H538.5L553 415.5L558.5 419.5L582 419L587.5 425L587 440L597.5 450.5L584 459.5L558.5 460.5L552 466V471.5L543 476L539.5 482.5L529 476H521.5L506.5 465L497 462.5L490.5 452V445.5Z"
              className={zoneClassName('Egypt')}
            />
            <text
              id="army_33"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="532" y="460.785">
                {map.zones['Egypt']?.armies}
              </tspan>
            </text>
            <text
              id="name_33"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="528.088" y="445.418">
                Egypt
              </tspan>
            </text>
          </g>
          <g id="Congo" onClick={() => onSelect('Congo')}>
            <path
              id="zone_31"
              d="M558.5 526H553L536 528.5L527 532.5L521 539.5L518 553L513 558.5L508 560L502.5 561L504.5 563L507 569L508 578.5L515 576H523L528.5 579.5L534.5 582.5L541 583.5L548 590.5L557.5 593.5L564 582.5V574L567.5 563L571.5 551.5L570 541L568 533.5L558.5 526Z"
              className={zoneClassName('Congo')}
            />
            <text
              id="army_34"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="535" y="558.785">
                {map.zones['Congo']?.armies}
              </tspan>
            </text>
            <text
              id="name_34"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="528.969" y="545.418">
                Congo
              </tspan>
            </text>
          </g>
          <g id="South Africa" onClick={() => onSelect('South Africa')}>
            <path
              id="zone_32"
              d="M508 591V578.5L515 576H523L528.5 579.5L535 582.5L541 583.5L548 591L557 593.5L564 582.5V574L567.5 562.5L568.5 560L571.5 552L582.5 570.5L580.5 579.5L586.5 584.5L584.5 576.5L588.5 570.5H599L609.5 575L603 586.5V595.5L606 600V606L594 617.5L592.5 637.5L579.5 655.5H574L556 672L543 671L532.5 658.5V647.5L521.5 633.5L520.5 623.5L518.5 610L511 603.5L508 591Z"
              className={zoneClassName('South Africa')}
            />
            <text
              id="army_35"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="546" y="632.785">
                {map.zones['South Africa']?.armies}
              </tspan>
            </text>
            <text
              id="name_35"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="542.531" y="605.418">
                South&#10;
              </tspan>
              <tspan x="542.253" y="617.418">
                Africa
              </tspan>
            </text>
          </g>
          <g id="Madagascar" onClick={() => onSelect('Madagascar')}>
            <path
              id="zone_33"
              d="M616.732 602.367L631.317 593H633L631.317 605.673L628.512 618.898V636.531L622.341 644.245L612.805 647L610 638.184V633.224V624.959L615.049 620.551L616.732 602.367Z"
              className={zoneClassName('Madagascar')}
            />
            <text
              id="army_36"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="611" y="635.785">
                {map.zones['Madagascar']?.armies}
              </tspan>
            </text>
            <text
              id="name_36"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="638.231" y="626.418">
                Madagascar
              </tspan>
            </text>
          </g>
          <g id="East Africa" onClick={() => onSelect('East Africa')}>
            <path
              id="zone_34"
              d="M586.5 584.5L580.5 579.5L582.5 570.5L575 562L574.5 561.5L571.5 551.5L570 541.5L568 534L563.5 530L558.5 526H552.5L552 523.5L543 511L538 503V493.5L543 487V476.5L552 471.5V466L558.5 460.5L584 459.5L597.5 450.5H601.5L609.5 466L619 474H623L625.5 471.5H632L637.5 469.5V476.5L629 484V493.5L625.5 502L611 520.5V532.5L616 540.5V552L614.5 559.5V571.5L609.5 575L599 570.5H588.5L584.5 576.5V578.5L586.5 584.5Z"
              className={zoneClassName('East Africa')}
            />
            <text
              id="name_37"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="570.72" y="494.418">
                East{' '}
              </tspan>
              <tspan x="567.253" y="506.418">
                Africa
              </tspan>
            </text>
            <text
              id="army_37"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="575.461" y="520.785">
                {map.zones['East Africa']?.armies}
              </tspan>
            </text>
          </g>
          <g id="North Africa" onClick={() => onSelect('North Africa')}>
            <path
              id="zone_35"
              d="M507.5 560L502.5 561L497.5 557L492.5 547L494 543.5L492 537H482L478 540L471.5 541.5L468 539.5H462L456 542.5L451 544L444.5 539.5L441.5 534L437 534.5L428 532L423 524.5L414 513.5L408 501.5L407 489L402.5 482.5V473L405.5 455H409.5L411.5 452L414 446.5L417 440.5H422L424 437.5L426 430L430 423L437 422L439.5 417H445.5L449.5 413H455L459 417H478L486.5 412H493.5L498 409.5H502L504.5 413V423L500.5 430L490.5 445.5V452L496.5 462.5L506 465L521.5 476H529L539.5 483L543 476.5V487L538 493.5V503L552 523.5L553 526L536 528.5L527 532.5L521 539.5L518 553L512.5 558.5L507.5 560Z"
              className={zoneClassName('North Africa')}
            />
            <text
              id="name_38"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="435.386" y="477.418">
                North Africa
              </tspan>
            </text>
            <text
              id="army_37"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="454.461" y="495.785">
                {map.zones['North Africa']?.armies}
              </tspan>
            </text>
          </g>
          <g id="Southern Europe" onClick={() => onSelect('Southern Europe')}>
            <g id="zone_36">
              <path
                d="M506.5 360L505.5 356.5L504 353.5L514 346.5H521.5L528 335.5L532.5 339L535 346.5H540L541.5 336H552L559 343L565 347.5V355.5V363H556L552 370.5L556 378L554.5 380.5L549 381.5L543.5 378L541.5 371.5L535 365.5L526.5 364L523 363L522 367L529.5 373.5L537.5 378L540 381.5H536.5L535 385V394.5L531.5 397L529.5 394.5L530.5 391V386L527.5 381.5L517 376L506.5 372.5V360Z"
                className={zoneClassName('Southern Europe')}
              />
              <path
                d="M521 399.5L518.5 397L527 396.5V400L524.5 402L521 399.5Z"
                className={zoneClassName('Southern Europe')}
              />
              <path
                d="M506.5 360L505.5 356.5L504 353.5L514 346.5H521.5L528 335.5L532.5 339L535 346.5H540L541.5 336H552L559 343L565 347.5V355.5V363H556L552 370.5L556 378L554.5 380.5L549 381.5L543.5 378L541.5 371.5L535 365.5L526.5 364L523 363L522 367L529.5 373.5L537.5 378L540 381.5H536.5L535 385V394.5L531.5 397L529.5 394.5L530.5 391V386L527.5 381.5L517 376L506.5 372.5V360Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Southern Europe')}
              />
              <path
                d="M521 399.5L518.5 397L527 396.5V400L524.5 402L521 399.5Z"
                stroke="black"
                strokeWidth="2"
                className={zoneClassName('Southern Europe')}
              />
            </g>
            <text
              id="army_38"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="509" y="360.785">
                {map.zones['Southern Europe']?.armies}
              </tspan>
            </text>
            <text
              id="name_39"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="8"
              fontWeight="500"
              letterSpacing="0em"
            >
              <tspan x="525" y="354.234">
                Southern&#10;
              </tspan>
              <tspan x="525" y="363.234">
                Europe
              </tspan>
            </text>
          </g>
          <g id="Argentina" onClick={() => onSelect('Argentina')}>
            <path
              id="zone_37"
              d="M262.5 622.5L256 612L248.5 622.5H241L239.5 612.5L223.5 600L218.5 602.5L213 599L207 600.5H202L196 580.5L190.5 579.5V623.5L185 636.5V653L175.5 674V686L178.5 687L173.5 694L175.5 700L170.5 702.5V715L167 719.5L170.5 725.5L167 731L168 746.5L175.5 754H185.5L191.5 751.5L187.5 748.5L179.5 743.5V733.5L184 731L187.5 721.5L191.5 718.5L190.5 715L192.5 710L200 708.5L204 701.5L197.5 697V692.5H205L212.5 687L216 678.5H224.5L231.5 672L235 669.5L238 651.5L245 635.5L262.5 622.5Z"
              className={zoneClassName('Argentina')}
            />
            <text
              id="name_40"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="188" y="642.418">
                Argentina
              </tspan>
            </text>
            <text
              id="army_39"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="202" y="657.785">
                {map.zones['Argentina']?.armies}
              </tspan>
            </text>
          </g>
          <g id="Quebec" onClick={() => onSelect('Quebec')}>
            <path
              id="zone_38"
              d="M314 293L305 298H288L277 306.5L269.5 297.5V266.5L271.5 263.5L278.5 260L284 258.5V254.5L286 251L284 247.5L286 245V237L290 233.5V224.5H288.5V221L291.5 217.5L290 214.5V210.5L294 205.5L298 209H301.5L307 214.5V217.5L305 220H301.5V224H304L308.5 228.5H312.5L318 221.5H319.5L326 228.5V238H330L335.5 242L341 247V252.5H346L351 249H354V255.5L349.5 262H344.5V257H342L338.5 259V265.5L332.5 271L325.5 271.5V275.5L330 278L327.5 280.5H318.5L311 285V289L317.5 286.5L320 288L314 293Z"
              className={zoneClassName('Quebec')}
            />
            <text
              id="name_41"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="290" y="264.418">
                Quebec
              </tspan>
            </text>
            <text
              id="army_40"
              fill="black"
              xmlSpace="preserve"
              strokeDasharray="2 2"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="296" y="279.785">
                {map.zones['Quebec']?.armies}
              </tspan>
            </text>
          </g>
          <g id="Ontario" onClick={() => onSelect('Ontario')}>
            <path
              id="Zone"
              d="M186 272V201.5V200.5H242L247 202.5V211.5L252 213L254.5 218.5V222.5L253 223.5V239L260 248.5H267.5V256.5L271.5 263.5L269.5 266.5V297.5L277 306.5L272.5 310L266 313H255L250 318.5L245.5 318V317V294L240 288.5V280L231.5 275.5L222.5 272H186Z"
              className={zoneClassName('Ontario')}
            />
            <text
              id="name_43"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="10"
              letterSpacing="0em"
            >
              <tspan x="201" y="245.418">
                Ontario
              </tspan>
            </text>
            <text
              id="army_42"
              fill="black"
              xmlSpace="preserve"
              fontFamily="Roboto"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="212" y="258.785">
                {map.zones['Ontario']?.armies}
              </tspan>
            </text>
          </g>
        </g>
        <g id="Paths">
          <path
            id="Vector 413"
            d="M349 526C349 526 360 517.5 374.5 511C389 504.5 399.5 504.5 399.5 504.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 414"
            d="M261.5 212.5C262.667 208.333 270.5 196.9 292.5 184.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 415"
            d="M344 148C359.5 137 372.4 137.8 374 137"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 416"
            d="M343.5 235.5C347 225 360.6 198 387 174"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 417"
            d="M425 146C428.5 147 445.6 153.8 450 157"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 418"
            d="M487 175C490.667 176.667 499.6 182 506 190"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 419"
            d="M491.5 277C489.5 283.167 484.7 296.1 481.5 298.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 420"
            d="M525 286C526.5 289.167 529.9 295.9 531.5 297.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 421"
            d="M454.5 328.5C450.833 334.5 444.6 351.1 449 369.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 422"
            d="M521.5 384.5C516.833 390.167 506.5 402.2 502.5 405"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 423"
            d="M536.5 399C538.167 403.167 541.7 412.6 542.5 417"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 424"
            d="M555 384C560.167 388.167 573.2 397.3 584 400.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 425"
            d="M619 453C617.095 455.745 612.829 461.588 611 463"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 426"
            d="M618 561C620.833 563.667 626.1 573.7 624.5 592.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 427"
            d="M594 639C595.957 639.667 601.696 641 609 641"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 428"
            d="M888 266.5C888.167 270.667 889.3 280.8 892.5 288"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 429"
            d="M867.5 304.5C869.333 306.333 874 310.4 878 312"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 430"
            d="M26 139C15.3689 138.04 4.23704 134.6 0 133"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 431"
            d="M1008 66C1012 65.6667 1022.1 64 1030.5 60"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 432"
            d="M825.5 420.5C827.833 424.667 832.8 435.3 834 444.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 433"
            d="M874.5 465.5C879 466 889.2 466.7 894 465.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 434"
            d="M868 477C869.5 479.333 872.6 486.3 873 495.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <path
            id="Vector 435"
            d="M929.5 483.5C930.5 485.167 932.4 490.9 932 500.5"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </g>
        <g id="Continents">
          <g id="South America">
            <path
              className={continentClassname('South America')}
              d="M158 462L168.5 449.5H178.5L185.5 452.5L198 449.5L203.5 450L211 445.5L208.5 451L212.5 454L217 451L225.5 460L229 459.5L243.5 471.5L254 472L269.5 486.5L270 501L274.5 496H279L280.5 503.5L286 499.5L296.5 509L307 515.5H317.5L323.5 513.5L339.5 524.5L342 531.5L340.5 543L323.5 557.5L322.5 570L318 587.5L309 602L295.5 603L285.5 608.5L283 616.5L278.5 624.5L277 633L269.5 637L251.5 658.5L244 659L237 656L235 669.5L231.5 672L224.5 678.5H216L212.5 687L205 692.5H197.5V697L204 701.5L200 708.5L192.5 710L190.5 715L191.5 718.5L187.5 721.5L184 731L179.5 733.5V743.5L191.5 751.5L186 754H175.5L168 746.5L167 731L170.5 725.5L167 719.5L170.5 715V702.5L175.5 700L173.5 694L178.5 687L175.5 686V674.5L185 653.5V637L190.5 623V579.5L180.5 564H169.5L162 553.5V546.5L155 544.5V532.5L146.5 521.5L147.5 514L151.5 508L147.5 502L151.5 494V486L157.5 478L158 462Z"
            />
          </g>
          <g id="Europe">
            <path
              d="M448 374L442.5 379V386L445 393V401.5L454.5 405.5L463 408.5L469 405.5H475.5L478.5 399V387.5L486 386L489 379L497 378H504.5L506.5 372.5L517 376L527.5 381.5L530.5 386V391L529.5 394.5L531.5 397L535 394.5V385L536.5 381.5H540L537.5 378L529.5 373.5L522 367L523 363L527 364L535 365.5L541.5 371.5L543.5 378L549 381.5L554.5 380.5L556 378L552 370.5L556 363H565V347.5L558 342L572.5 341L578.5 333L583 330.5L590.5 332L591.5 336H583L576.5 343V347H587L591.5 344.5L595 347L592 352.5L593 357L600 372H608.5L611.5 375L613 380.5L620 379V369.5L614.5 357.5V348L624.5 342.5L623 328L628.5 319.5L623 298L624.5 295H643L650 289L672 258.5L674 236.5L673 236L660 216V193L671 179.5L674.5 169L675.5 163.5L681.5 162L680 153L674.5 147L673 144L679 135.5L680 128.5L677 118.5H676.5H674L669.5 113.5H664.5L660.5 117L661.5 126V133.5L656 137.5L653 136H645.5L642 145.5L640.5 157H637.5L635 149.5L636.5 147.5V144H632L624 157L620 155H610.5L606.5 161L610.5 165.5L611.5 169.5H603.5L597.5 173.5L597 180L602.5 186.5V190.5H599.5L583 180L567.5 174L570 171.5L581.5 175H589.5V168.5L585.5 157L579.5 149.5H567L563 151.5L537.5 148.5L534 157.5L526.5 159L517.5 163L509 176V184.5L511 191.5L512.5 195.5L511 205L502.5 218.5V227L495.5 232.5L486.5 235.5V241L489 243.5L491 253V268.5L498.5 274.5L506 271.5L515.5 270L522 282L530 284.5L535.5 279.5V266.5L538.5 261L537.5 250.5L535.5 242L537.5 232.5L540.5 222.5L551 206L552.5 211.5L555 215.5L551 224.5V250.5L555 260.5H562L568 256.5L570.5 257L574.5 261.5L581 263L583 265.5H572.5L565.5 268L562 271.5L557 279L553 287L549.5 292.5L540 296L530 302L520.5 308.5L514.5 303.5V294.5L509 296L507 310L502.5 317L490.5 326L486 335.5V341L472.5 348L468 353L463 356.5V359.5L468 362.5H472.5L475.5 367.5V373L465.5 374H448Z M446.5 315.5V308.5L450.5 305.5L454 301.5L458.5 304L460 311V319.5L456 324.5H448.5L445 322L446.5 315.5Z M474 326.5L469.5 329L466 322L463.5 315.5L469.5 311V306H464.5L461.5 294.5V281.5L469.5 276.5L472.5 283L476 286.5L474 296.5L480.5 304L488 313.5L486.5 322H479L474 326.5Z M488 159V169L480.5 177L472.5 182L468.5 180L459 178.5L455 172V166.5L453 159L461 158L465 161L471 159L477 152.5L488 159Z"
              className={continentClassname('Europe')}
            />
          </g>
          <g id="Africa">
            <path
              d="M409.5 455H405.5L402.5 473V482.5L407 489L408 501.5L414 513.5L423 524.5L428 532L437 534.5L441.5 534L444.5 539.5L451 544L456 542.5L462 539.5H468L471.5 541.5L478 540L482 537H492L494 543.5L492.5 547L497.5 557L504.5 563L507 569L508 579V591L511 603.5L518.5 610L521.5 633.5L532.5 647.5V658.5L543 671L556 672L574 655.5H579.5L592.5 637.5L594 617.5L606 606V600L603 595.5V586.5L609 575.5L614.5 571.5V559.5L616 552V540.5L611 532.5V520.5L625.5 502L629 493.5V484L637.5 476.5V469.5L632 471.5H625.5L623 474H619L609.5 466L601.5 450.5H597.5L587 440L587.5 425L582 419L558.5 419.5L553 415.5L538.5 426.5H529L521.5 421.5H516.5L513 425L504.5 423V413L502 409.5H498L493.5 412H486.5L478 417H459L455 413H449.5L445.5 417H439.5L437 422L430 423L426 430L424 437.5L422 440.5H417L411.5 452L409.5 455Z M631.5 604.5L633 593H631L617 602L615 620.5L610 625V638L613 647L622.5 644L628.5 636.5V619L631.5 604.5Z"
              className={continentClassname('Africa')}
            />
          </g>
          <g id="Australia">
            <path
              d="M831.5 566.5V560L836.5 552.5L844 544.5L848.5 543.5L851.5 539.5L847.5 536L848.5 531.5L855 526.5L856 517.5L864.5 516.5L867.5 507L872.5 503.5V500H879L883.5 502.5L888.5 503.5L897.5 509L906 507.5L904.5 503.5V495L906 493L924 505H934.5L937.5 511L949 517H955.5L964.5 531L966.5 540L964.5 557V566.5L955.5 573L952 574.5L947 579.5H937.5L934.5 577.5H928L925.5 569.5H920L917 577.5L908 571H902L894.5 574.5L888.5 582.5L885 590.5L872.5 591.5L868 597.5L866 601H858.5L853.5 594.5L851.5 589.5L845.5 588.5L842.5 581L837.5 578.5L836.5 571.5L831.5 567V566.5Z M912 460L899.5 453.5L896 458L899.5 464L897.5 468H910L919.5 473.5L926 479H933L937 484.5L946 482.5L957.5 484.5L966.5 487L962 479V470.5L949.5 468L946 460H934.5L927.5 465.5L920.5 463L916.5 456.5L912 460Z M871.5 473L867.5 471.5L863.5 475H858.5L861.5 468L863.5 464.5L867.5 456.5L878 454L876 456.5L871.5 461V473Z M848 478H841L838 475L830 471.5V467L827.5 461V454L833 449.5H843L846.5 442L851.5 440L855 443.5V457L848 478Z M816.5 480.5V489L814.5 491.5L803.5 484V478L797 475V471.5L791 468.5L785 464.5L782.5 458.5H793.5L806.5 470L808.5 475L816.5 480.5Z M874 440L871.5 436L874 432.5H881L886.5 436L881 440H874Z M870 429L867.5 427L870 423L874 425.5L870 429Z M885 423L879.5 421L878 425.5L881 427L885 423Z M870 410L874 412.5L870 417L863.5 412.5V401L867.5 398L870 403.5V410Z"
              className={continentClassname('Australia')}
            />
          </g>
          <g id="North America">
            <path
              className={continentClassname('North America')}
              d="M241 199.5L244.5 191M244.5 191L247.5 185.5H254.5L258 181H262.5L267.5 174.5L262.5 169.5L273 158.5H282.5L287 154.5L288 140L285 135L280.5 140V149.5L274.5 143V135H271L267.5 140L262.5 137L260 123L254.5 116L249.5 121.5V132L254.5 140L250.5 144L249.5 148L244.5 149.5L241 144H236V149.5L230 151.5L226 148H219L216.5 156L216 158.5V161.5L210.5 160.5L207.5 156.5L201 157.5L199.5 161.5L194.5 158.5L199.5 152L194.5 148.5L187.5 151L183 147.5L184 144V136.5L176 140L163 138L162 131L149.5 120.5H143.5L135.5 116L131.5 110.5L122.5 117.5L119.5 112L110.5 117.5L106 117H95.5L87.5 112.5L85 108L80 106.5L77.5 102.5L70.5 102L65.5 96.5H60.5L56.5 95.5L51 100L42 101L34 108L29 115L27.5 118H20.5L16.5 120V125L20.5 129L27.5 134L30 138V145.5H22.5L18 150V154L19.5 155H29L32.5 153H36.5V158.5L35 163V167L25.5 175.5V182L24 186L26.5 187.5L32.5 190.5L40 193.5H52.5L57 189L64.5 187L67.5 193.5L69.5 199.5L76.5 203.5L82.5 208.5L85 216L87.5 221.5V232L89 238.5V254L91.5 261.5H93.5V272L87.5 282L83.5 291.5L82.5 297L84.5 300V312L81.5 319V323.5L84.5 325.5V329L81.5 331.5V333.5L93.5 350L95.5 355H96L105.5 371.5L106.5 385.5L113.5 393.5L120.5 404L122 401.5L114.5 384.5L111.5 374V370H114.5L124.5 388L133.5 399L143 404.5L146.5 411L148.5 419L159 424.5L166 425L167.5 430.5L180 439.5L188.5 446.5L190 449.5L194 448.5L196.5 448L186 435V421.5L179.5 419L188.5 407.5L183 401.5L174 408.5L168.5 404.5L171.5 381.5L180 372.5L195 372L201.5 368.5H212L217 374.5L218 381.5L222.5 385.5L225 389L228 387.5V378.5L223 371.5L222.5 362L224.5 355L234.5 350L247 347.5L253.5 342L258 342.5L262.5 331.5L266.5 330.5L268.5 335H272L278 328L289.5 326L295.5 318.5L303 317L310 306H315L315.5 312.5H318L322 303L324 301L319.5 295.5L315.5 299L310.5 301.5L305 298L314 293L320 288L317.5 286.5L311 289V285L318.5 280.5H327.5L330 278L325.5 275.5V271.5L332.5 271L338.5 265.5V259L342 257H344.5V262H349.5L354 255.5V249H351L346 252.5H341V247L335.5 242L330 238H326V228.5L319.5 221.5H318L312.5 228.5H308.5L304 224H301.5V220H305L307 217.5V214.5L301.5 209H298L294 205.5L290 210.5V214.5L291.5 217.5L288.5 221V224.5H290V233.5L286 237V245L284 247.5L286 251L284 254.5V258.5L278.5 260L271.5 263.5L267.5 256.587V248.5H260L253 239V223.5L254.5 222.5V218.5L252 213L247 211.5V202.5L241 199L244.5 191ZM298.5 184H303L305 189H309L312.5 185.5L316 187L318 198L334.5 212.5L337 209.5L332 200.5L329 194H340.5L342 190.5L336 181L332 175.5L336 169.5L340.5 175.5L346 178L350.5 170.5V166.5H346L343 161.5L338.5 156L331 151.5L332 145.5L331 132H325.5V123L318 120.5L317 109L310 101.5L305 104V98.5L302 93.5H293.5L291.5 91H285L287 98.5L282.5 102L278.5 97L274.5 89.5L276.5 85V79.5L267.5 83.5L262.5 91L264.5 95.5V104L273 110.5L274.5 117L283.5 123L293.5 125.5L302 123L306.5 127.5V135L309 144L311 148L309 154.5V161.5L312.5 166.5V174.5L309 177L303 174.5L299.5 176M298.5 184L299.5 176M298.5 184L299.5 176.5V176M388 159L395.5 167.5L400 176.5L411.5 178L413.5 161.5L417.5 150L426.5 139L432.5 135L430 127L432.5 123H440.5V114.5H444V109L437.5 104.5L440.5 98.5L447.5 97L449 88.5L451 84.5L445.5 81.5V76.5L452.5 72V64.5H442V57.5L450 55.5L451 48.5L439 44.5L435.5 52.5L430 56.5L424 55.5L426.5 50V42.5L432.5 37.5V30L426.5 29L424 33.5L420.5 29L413.5 31L412 29L420.5 26L426.5 21.5L422 16L424 11.5L415.5 7L401 9.5L396 18.5L391 20L384.5 14L374.5 11.5L365.5 18.5V23.5L366.5 31L362.5 35.5L357.5 31H350L346 40.5L352 48.5L351 56.5H343L341 63.5L344 72L353.5 71L365.5 72L364 81.5L361 92L365.5 105.5L369 109L375 105.5L379.5 117L382 130L384 141.5L382 147L386 150L388 159ZM194.5 95V100.5L199.5 103.5V108L213 110.5L224 117.5L230 120.5V131L234 135V140L224 135H213L210.5 138H198L194.5 133.5L202 131L210.5 129.5L206.5 124L199.5 120.5L192 124L189 120.5L194.5 116L192 110.5L185 112L180.5 116L174 112V106.5L178.5 100.5H185L189 93.5L194.5 95ZM155.5 98.5L152 90L153.5 86L158 80L165 83L166.5 90L172 98.5V103.5H166.5L159.5 108L149.5 106.5L148 100.5L155.5 98.5ZM175 97L174 89L180.5 83H187L189 90L183 91.5V97H175Z"
            />
          </g>
          <g id="Asia">
            <path
              d="M592 385H572L568 382.5L563 380L561.5 376L566 370.5L582 355.5H590L592 352.5L593 357L600 372H608.5L611.5 375L613.5 380.5L620 379V369.5L614.5 357.5V348L624.5 342.5L623 328L628.5 319.5L623 298L624.5 295H643.5L650 289L672 258.5L674 237L673 236L660 216V193L671 179.5L674.5 169L675.5 163.5L681.5 162L680 153L674.5 147L673 144L679 135.5L680 128.5L677 118.5L679 115.5L675.5 111V104L681.5 96.5H687L691 99H694.5L699.5 91.5V82.5L694 73L694.5 61.5L698 58V48L702.5 35L706.5 31.5L709 32.5L708 42.5L710 47L713.5 51L712 55.5V61.5L714.5 74L719.5 81V94L721 101L719.5 109.5L712 112L703 115.5L698 120L699.5 123L707.5 120L716 118.5L720.5 119L721.5 122.5L724.5 123L726.5 116.5L729.5 115.5V112L725.5 107.5V105L731 100V88.5H733L735.5 93L737 99L736.5 107.5L738.5 115L741 115.5L746 111V104.5L750.5 109.5L756 125L760 130.5L761.5 128V121L757.5 113.5V103.5L750.5 92.5L748 80L740.5 80.5L738 78L733.5 80L728 78V58.5H732.5L734 62.5L735 64.5H738L739.5 59.5H741.5L743.5 64.5L746 64L747 59.5L750.5 61V66L749 68.5V72L752.5 76.5V83.5L757.5 88.5L760.5 95L762 100L764 109.5L765 111H768.5V96.5L765 92V84.5L760.5 77L757.5 68L758.5 61.5L752 53.5L752.5 48L760.5 40L764 37.5V33.5L760 33V29.5L763.5 28.5L764 24H770.5L775 20H786.5L789.5 21H794.5L800 16.5L809 15L813 16L815.5 18.5L822.5 20L823 19.5L824.5 17H832V20.5L831 24L833.5 25.5L837 22.5L843 15.5H852.5L856.5 17L859.5 14.5V9L864 5H867L871 9H882V11L879.5 12.5V15.5L893 17L902.5 25.5L904.5 28H912.5L916 29.5L921 24H932L940 17H944.5L951.5 9L952.5 5.5H962.5L970 0.5L971.5 3L976.5 8.5L978.5 13.5H981.5L987.5 19L992.5 28L1000 38L1004.5 46L1008 54.5V59.5L1002 65L1000 77L993.5 84.5L989 111.5L976.5 128L970 132V137L967.5 139.5L959 146.5L951 158L948 167.5L951 183L952 194L949.5 203V215L948 217L944 213L938.5 202L937.5 189L940 172.5V165.5L944 159V155L942 152.5L938.5 153.5V159L935.5 162L932 160.5L929.5 161L926.5 170L916 187H911L905 190.5L902 189L898.5 189.5L890 199V203L882 213V219.5L888 224.5L890 220.5L893 220V230.5L895 233.5L893.5 237L893 247.5L889 253.5L887.5 261L881 270.5L876.5 278.5L867.5 281.5L867 282.5V300.5L863.5 303.5V308L868.5 314.5V317.5L866.5 319.5H863.5L858 316.5L857 311L850 310.5V306L846.5 303L842 302H838L836.5 299.5L831 305.5L834 307.5L836.5 312.5L840 316H844V320H838.5V325L844 331.5V338.5L850.5 345.5L848 349L846.5 355.5L841 361L838.5 369L831 372L826 376L817.5 377.5V382L814.5 385V392.5L826 403.5L827.5 406.5V410L820 423L818 425L810 416H802L803 426L814.5 436.5V442L818 449.5V452.5L815 452L798 432.5L793 417L785.5 410L782.5 412L780.5 414.5L777.5 411.5L777 405L771 404H763.5L759.5 397.5L747.5 405.5V414L736 426.5V444.5L729.5 453.5L720 445.5L719.5 439L709.5 428.5L705 420L700.5 423V417.5L691 413.5L692.5 416.5L690 417.5L678 410L669 412L664.5 408H654L648.5 405.5L643.5 402L638.5 401L636.5 403.5L639.5 407.5L651.5 415L652 421L657.5 427L660 425.5V421.5L663 418L666 419.5V430.5L660 435.5L659 439.5L654.5 440.5L652 445.5L644.5 450L631 462.5H628L620.5 452.5L614 446L606 441L596 424.5L590 423L585.5 417L586 406L590.5 399.5L593 391.5L592 385Z M916 265.5L913.5 271L905.5 271.5L896.5 274.5L901 264.5L899.5 262L902 258.5L905.5 260L911.5 261L916 265.5Z M913.5 283L905 278L897.5 280V286.5L899.5 289.5L895 291L892 296L890.5 299L893 301.5V305.5L885.5 306.5L880.5 313.5V321.5L885.5 336L890.5 334L893 320L903.5 313.5L902 308L913.5 301.5V283Z"
              className={continentClassname('Asia')}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
